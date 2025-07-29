import { Project, projectSchema } from "@/database/schemas/project"; // Importar Project e projectSchema do data.ts
import { z } from "zod"; // Importar z de zod

// Obtém a URL base da API das variáveis de ambiente
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("Environment variable NEXT_PUBLIC_API_BASE_URL is not set.");
  // Em um ambiente de produção, você pode querer lançar um erro ou ter um fallback mais robusto.
}

const projectService = {
  // 1. Listar todos os projetos
  getAllProjects: async (): Promise<Project[]> => {
    if (!API_BASE_URL) throw new Error("API base URL not configured.");
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch projects");
    }
    // Opcional: Validar os dados recebidos da API com Zod no cliente também
    // Isso garante que os dados correspondem ao que esperamos, mesmo se a API enviar algo inesperado.
    const data = await response.json();
    return z.array(projectSchema).parse(data);
  },

  // 1.1 Buscar um projeto por ID
  getProjectById: async (id: string): Promise<Project | null> => {
    if (!API_BASE_URL) throw new Error("API base URL not configured.");

    const response = await fetch(`${API_BASE_URL}/projects/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch project");
    }

    const data = await response.json();

    return projectSchema.parse(data);
  },

  // 2. Adicionar um novo projeto
  addProject: async (projectData: Project): Promise<Project> => {
    if (!API_BASE_URL) throw new Error("API base URL not configured.");
    const response = await fetch(`${API_BASE_URL}/projects`, {
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
    return projectSchema.parse(data); // Validar resposta
  },

  // 3. Editar um projeto existente
  // Partial<ProjectPayload> permite enviar apenas um subconjunto dos campos para atualização
  updateProject: async (
    id: string,
    projectData: Partial<Project>
  ): Promise<Project> => {
    if (!API_BASE_URL) throw new Error("API base URL not configured.");
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...projectData }),
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
    return projectSchema.parse(data); // Validar resposta
  },

  // 4. Remover um projeto
  deleteProject: async (id: string): Promise<{ message: string }> => {
    if (!API_BASE_URL) throw new Error("API base URL not configured.");
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete project");
    }
    return response.json();
  },

  // 5. Favoritar/Desfavoritar um projeto
  toggleFavorite: async (id: string): Promise<Project> => {
    if (!API_BASE_URL) throw new Error("API base URL not configured.");
    const response = await fetch(`${API_BASE_URL}/projects/${id}/favorite`, {
      method: "PATCH",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to toggle favorite status");
    }
    const data = await response.json();
    return projectSchema.parse(data); // Validar resposta
  },
};

export default projectService;
