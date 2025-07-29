import { FormHeader } from "@/features/form/components/header";
import projectService from "@/lib/services/project.service";
import { SearchView } from "@/features/search/search.view";
import { Suspense } from "react";

interface Params {
  params: {
    search: string;
  };
}

export default async function NewProject({ params }: Params) {
  const { search } = await params;
  const projects = await projectService.getAllProjects();

  const decodedSearch = decodeURIComponent(search);

  return (
    <>
      <FormHeader title="Resultado da busca" backHref="/" />

      <Suspense fallback={<div>Carregando...</div>}>
        <SearchView projects={projects} search={decodedSearch} />
      </Suspense>
    </>
  );
}
