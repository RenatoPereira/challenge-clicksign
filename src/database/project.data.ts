import fs from "fs";
import path from "path";
import { Project, projectSchema } from "@/database/schemas/project";
import z from "zod";

const projectsFilePath = path.join(process.cwd(), "src/database/projects.json");

export const getProjects = (): Project[] => {
  try {
    const jsonData = fs.readFileSync(projectsFilePath, "utf-8");
    const parsedData = JSON.parse(jsonData);
    // Valide os dados lidos com o schema Zod para garantir consistência
    return z.array(projectSchema).parse(parsedData);
  } catch (error) {
    console.error("Error reading or parsing projects file:", error);
    // Em caso de erro na leitura ou validação, retorna um array vazio
    return [];
  }
};

// Helper function to write projects to the JSON file
export const saveProjects = (projects: Project[]) => {
  try {
    // Valida antes de salvar para garantir que estamos salvando dados válidos
    const validatedProjects = z.array(projectSchema).parse(projects);
    fs.writeFileSync(
      projectsFilePath,
      JSON.stringify(validatedProjects, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing projects file:", error);
  }
};
