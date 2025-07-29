import { z } from "zod";

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

export type Project = z.infer<typeof projectSchema>;

export const projectIdSchema = z.object({
  id: z.string().min(1, "ID do projeto é obrigatório."),
});
