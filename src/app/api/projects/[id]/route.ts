import { NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/database/project.data";
import {
  projectIdSchema,
  Project,
  projectSchema,
} from "@/database/schemas/project";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams) {
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

    return NextResponse.json(projects[projectIndex], { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.issues.map((issue) => issue.message) },
        { status: 400 }
      );
    }
    console.error("Error retrieving project:", error);
    return NextResponse.json(
      { message: "Error retrieving project." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    projectIdSchema.parse({ id });

    const body = await request.json();

    const validatedData = projectSchema.parse(body);

    const { ...updatedFields } = validatedData;

    const projects = getProjects();
    const projectIndex = projects.findIndex((p: Project) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...updatedFields,
      id: projects[projectIndex].id,
      favorited:
        typeof updatedFields.favorited === "boolean"
          ? updatedFields.favorited
          : projects[projectIndex].favorited,
    };

    saveProjects(projects);
    return NextResponse.json(projects[projectIndex], { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.issues.map((issue) => issue.message) },
        { status: 400 }
      );
    }
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Error updating project." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    projectIdSchema.parse(params);

    const { id } = await params;

    let projects = getProjects();
    const initialLength = projects.length;
    projects = projects.filter((p: Project) => p.id !== id);

    if (projects.length === initialLength) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    saveProjects(projects);
    return NextResponse.json(
      { message: "Project deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.issues.map((issue) => issue.message) },
        { status: 400 }
      );
    }
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Error deleting project." },
      { status: 500 }
    );
  }
}
