"use client";

import projectService from "@/lib/services/project.service";
import { Project } from "@/database/schemas/project";
import { ProjectForm } from "../components/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const FormSubmitContainer = () => {
  const router = useRouter();

  const onSubmit = async (data: Project) => {
    await projectService.addProject(data);
    router.push("/");
    toast.success("Projeto criado com sucesso!");
  };

  return <ProjectForm onSubmit={onSubmit} />;
};
