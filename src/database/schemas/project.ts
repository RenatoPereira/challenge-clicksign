import { z } from "zod"; // Importar z de zod

// Definir o schema Zod para um Projeto.
// Zod infere automaticamente a interface Project a partir deste schema.
export const projectSchema = z
  .object({
    id: z.string().optional(),
    projectName: z
      .string()
      .trim()
      .regex(/^\s*\S+\s+\S+.*$/, "Por favor, digite ao menos duas palavras"),
    client: z.string().trim().min(1, "Nome do cliente é obrigatório."),
    startDate: z.coerce.date("Selecione uma data válida"),
    endDate: z.coerce.date("Selecione uma data válida"),
    projectCover: z.string().optional(),
    favorited: z.boolean().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "Data final deve ser após a data inicial.",
    path: ["endDate"],
  });

// Inferir a interface TypeScript a partir do schema Zod
export type Project = z.infer<typeof projectSchema>;

// Schema para validar IDs de projeto (usado em DELETE e PATCH)
export const projectIdSchema = z.object({
  id: z.string().min(1, "ID do projeto é obrigatório."),
});
