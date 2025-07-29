"use client";

import { Project } from "@/database/schemas/project";
import { useProjects } from "../../lib/hooks/projects.hook";
import { ProjectCard } from "../../components/card-project";
import { ProjectOrder } from "./components/order";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiPlusCircle } from "react-icons/pi";
import { FilterFavorites } from "./components/filter-favorites";

type Props = {
  projects: Project[];
};

export const ProjectsView = ({ projects }: Props) => {
  const { visibleProjects } = useProjects({ projects });

  return (
    <section className="flex flex-col gap-[22px]">
      <header className="flex items-center justify-between items-start lg:items-center">
        <h1 className="text-2xl font-bold text-primary">
          Projetos ({visibleProjects.length})
        </h1>

        <div className="flex flex-col lg:flex-row items-end lg:items-center gap-4 lg:gap-8">
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

      <ul className="flex flex-wrap gap-8">
        {visibleProjects.map((project) => (
          <li key={project.id} className="w-[346px]">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
};
