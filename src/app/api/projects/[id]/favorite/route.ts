import { NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/database/project.data";
import { projectIdSchema, Project } from "@/database/schemas/project";
import { z } from "zod";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    projectIdSchema.parse({ id });

    const projects = getProjects();
    const projectIndex = projects.findIndex((p: Project) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    projects[projectIndex].favorited = !projects[projectIndex].favorited;
    saveProjects(projects);

    return NextResponse.json(projects[projectIndex], { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.issues.map((issue) => issue.message) },
        { status: 400 }
      );
    }
    console.error("Error toggling favorite status:", error);
    return NextResponse.json(
      { message: "Error toggling favorite status." },
      { status: 500 }
    );
  }
}
