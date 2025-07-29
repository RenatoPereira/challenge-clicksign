import { NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/database/project.data";
import { Project, projectSchema } from "@/database/schemas/project";
import { z } from "zod";
import { v4 as uuid } from "uuid";

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return NextResponse.json(
      { message: "Error retrieving projects." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = projectSchema.parse(body);

    const projects = getProjects();
    const newProject: Project = {
      ...validatedData,
      id: uuid(),
      favorited: false,
    };

    projects.push(newProject);
    saveProjects(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.issues.map((issue) => issue.message) },
        { status: 400 }
      );
    }

    console.error("Error adding project:", error);
    return NextResponse.json(
      { message: "Error adding project." },
      { status: 500 }
    );
  }
}
