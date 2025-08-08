"use client";

import { useProjects } from "@/lib/hooks/projects.hook";
import { ProjectCard } from "./components/card-project";
import { ProjectOrder } from "./components/order";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiPlusCircle } from "react-icons/pi";
import { FilterFavorites } from "./components/filter-favorites";
import { useProjectsData } from "@/lib/hooks/projects-data.hook";

export const ProjectsContainer = () => {
  const { data, isPending, isError } = useProjectsData();

  const { visibleProjects } = useProjects({ projects: data });

  if (isPending || isError || data?.length === 0) return null;

  return (
    <section className="flex flex-col gap-[22px]">
      <header className="flex flex-col sm:flex-row items-center justify-between items-start lg:items-center gap-8 w-full">
        <h1 className="text-2xl font-bold text-primary">
          Projetos{" "}
          <span className="text-accent text-[17px] leading-6 font-normal align-text-bottom">
            ({visibleProjects.length})
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row items-end lg:items-center gap-4 lg:gap-8 w-full sm:w-auto">
          <FilterFavorites />
          <ProjectOrder />
          <Link href="/new">
            <Button>
              <PiPlusCircle className="size-5" />
              Novo projeto
            </Button>
          </Link>
        </div>
      </header>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(346px,1fr))] gap-8">
        {visibleProjects.map((project) => (
          <li key={project.id} className="w-full">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
};
