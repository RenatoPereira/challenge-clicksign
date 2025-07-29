import { Project, projectSchema } from "@/database/schemas/project";
import { z } from "zod";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("Environment variable NEXT_PUBLIC_API_BASE_URL is not set.");
}

const projectsFetcher = async (url: string, options?: RequestInit) => {
  if (!API_BASE_URL) throw new Error("API base URL not configured.");

  const response = await fetch(`${API_BASE_URL}/${url}`, {
    ...options,
  });

  return response;
};

const projectService = {
  getAllProjects: async (): Promise<Project[]> => {
    try {
      const response = await projectsFetcher(`projects`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch projects");
      }

      const data = await response.json();
      return z.array(projectSchema).parse(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  },

  getProjectById: async (id: string): Promise<Project | null> => {
    try {
      const response = await projectsFetcher(`projects/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch project");
      }

      const data = await response.json();

      return projectSchema.parse(data);
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    }
  },

  addProject: async (projectData: Project): Promise<Project> => {
    try {
      const response = await projectsFetcher(`projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors
            ? errorData.errors.join(", ")
            : errorData.message || "Failed to add project"
        );
      }

      const data = await response.json();
      return projectSchema.parse(data);
    } catch (error) {
      console.error("Error adding project:", error);
      throw new Error("Failed to add project");
    }
  },

  updateProject: async (
    id: string,
    projectData: Partial<Project>
  ): Promise<Project> => {
    const response = await projectsFetcher(`projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors
          ? errorData.errors.join(", ")
          : errorData.message || "Failed to update project"
      );
    }

    const data = await response.json();
    return projectSchema.parse(data);
  },

  deleteProject: async (id: string): Promise<{ message: string }> => {
    const response = await projectsFetcher(`projects/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete project");
    }

    return response.json();
  },

  toggleFavorite: async (id: string): Promise<Project> => {
    const response = await projectsFetcher(`projects/${id}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to toggle favorite status");
    }

    const data = await response.json();

    return projectSchema.parse(data);
  },
};

export default projectService;
