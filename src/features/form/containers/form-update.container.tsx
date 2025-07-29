"use client";

import projectService from "@/lib/services/project.service";
import { Project } from "@/database/schemas/project";
import { ProjectForm } from "../components/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const FormUpdateContainer = ({ project }: { project: Project }) => {
  const router = useRouter();

  const onSubmit = async (data: Project) => {
    await projectService.updateProject(data.id!, data);
    toast.success("Projeto atualizado com sucesso!");
    router.push("/");
  };

  return <ProjectForm onSubmit={onSubmit} project={project} />;
};
