import { Project } from "@/database/schemas/project";
import { useState, useEffect } from "react";
import { useFilterStore } from "@/lib/stores/filter.store";
import { useOrderStore } from "@/lib/stores/order.store";
import { normalizeSearch } from "@/lib/utils";

type Props = {
  projects: Project[];
  search?: string;
};

export const useProjects = ({ projects, search }: Props) => {
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const filter = useFilterStore((state) => state.filter);
  const order = useOrderStore((state) => state.order);

  const applyFavoritesFilter = (items: Project[]) => {
    return filter === "favorites"
      ? items.filter((project) => project.favorited)
      : items;
  };

  const applyOrderFilter = (items: Project[]) => {
    const today = new Date();

    switch (order) {
      case "alphabetical":
        return items.sort((a, b) => {
          if (a.projectName < b.projectName) return -1;
          if (a.projectName > b.projectName) return 1;
          return 0;
        });
      case "started_recently":
        const projectsStarted = items.filter((project) => {
          const startDate = new Date(project.startDate);
          return startDate < today;
        });

        const projectsNotStarted = items.filter((project) => {
          const startDate = new Date(project.startDate);
          return startDate >= today;
        });

        const sortedProjectsStarted = projectsStarted.sort((a, b) => {
          const aDiff = Math.abs(
            new Date(a.startDate).getTime() - today.getTime()
          );
          const bDiff = Math.abs(
            new Date(b.startDate).getTime() - today.getTime()
          );
          return aDiff - bDiff;
        });

        return [...sortedProjectsStarted, ...projectsNotStarted];
      case "next_to_end":
        const projectsEnded = items.filter((project) => {
          const endDate = new Date(project.endDate);
          return endDate < today;
        });

        const projectsNotEnded = items.filter((project) => {
          const endDate = new Date(project.endDate);
          return endDate >= today;
        });

        const sortedProjectsNotEnded = projectsNotEnded.sort((a, b) => {
          const aDiff = Math.abs(
            new Date(a.endDate).getTime() - today.getTime()
          );
          const bDiff = Math.abs(
            new Date(b.endDate).getTime() - today.getTime()
          );
          return aDiff - bDiff;
        });

        return [...sortedProjectsNotEnded, ...projectsEnded];
      default:
        return items;
    }
  };

  const applySearchFilter = (items: Project[]) => {
    if (!search) return items;

    const lowerCaseSearch = normalizeSearch(search || "");

    return items.filter(
      (project) =>
        normalizeSearch(project.projectName).includes(lowerCaseSearch) ||
        normalizeSearch(project.client).includes(lowerCaseSearch)
    );
  };

  useEffect(() => {
    const favoritedProjects = applyFavoritesFilter(projects);
    const filteredProjects = applySearchFilter(favoritedProjects);
    const orderedProjects = applyOrderFilter(filteredProjects);

    setVisibleProjects(orderedProjects);
  }, [projects, filter, order, search]);

  return {
    visibleProjects,
  };
};
