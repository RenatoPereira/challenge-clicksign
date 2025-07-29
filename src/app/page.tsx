import { EmptyState } from "@/components/empty-state";
import { PiPlusCircle } from "react-icons/pi";
import projectService from "@/lib/services/project.service";
import { ProjectsView } from "@/features/projects/projects.view";

export default async function Home() {
  const projects = await projectService.getAllProjects();

  return projects.length === 0 ? (
    <EmptyState
      title="Nenhum projeto"
      description="Clique no botão abaixo para criar o primeiro e gerenciá-lo"
      button={{
        href: "/new",
        label: "Novo Projeto",
        icon: <PiPlusCircle className="size-5" />,
      }}
    />
  ) : (
    <ProjectsView projects={projects} />
  );
}
