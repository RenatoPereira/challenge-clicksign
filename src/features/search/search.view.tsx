"use client";

import { useEffect } from "react";
import { Project } from "@/database/schemas/project";
import { useProjects } from "@/lib/hooks/projects.hook";
import { useSearchStore } from "@/lib/stores/search.store";
import { EmptySearch } from "@/components/ui/empty-search";
import { ProjectCard } from "@/components/card-project";

type Props = {
  search: string;
  projects: Project[];
};

export const SearchView = ({ projects, search }: Props) => {
  const { visibleProjects } = useProjects({ projects, search });
  const searchBy = useSearchStore((state) => state.searchBy);

  useEffect(() => {
    searchBy(search);
  }, [search]);

  return (
    <>
      {visibleProjects.length > 0 && (
        <section className="flex flex-col gap-[22px]">
          <ul className="flex flex-wrap gap-8">
            {visibleProjects.map((project) => (
              <li key={project.id} className="w-[346px]">
                <ProjectCard project={project} highlight={search} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {visibleProjects.length === 0 && search !== "" && (
        <section className="border rounded-lg flex flex-col items-center justify-center gap-4 py-13 px-4">
          <EmptySearch
            title="Nenhum projeto encontrado"
            description="Nenhum projeto encontrado para a sua busca."
          />
        </section>
      )}
    </>
  );
};
