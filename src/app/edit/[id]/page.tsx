import { FormHeader } from "@/features/form/components/header";
import projectService from "@/lib/services/project.service";
import { notFound } from "next/navigation";
import { FormUpdateContainer } from "@/features/form/containers/form-update.container";

export default async function EditProject({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const project = await projectService.getProjectById(id);

  if (!project) {
    return notFound();
  }
  return (
    <>
      <FormHeader title="Editar Projeto" backHref="/" />

      <section className="border rounded-lg flex flex-col items-center justify-center gap-4 py-13 px-4">
        <FormUpdateContainer project={project} />
      </section>
    </>
  );
}
