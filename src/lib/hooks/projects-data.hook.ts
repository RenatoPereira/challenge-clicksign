import { useQuery } from "@tanstack/react-query";
import projectService from "@/lib/services/project.service";
import { QueryCache } from "@tanstack/react-query";

export const useProjectsData = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getAllProjects(),
  });

  return { data, isPending, isError, error };
};

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
  onSettled: (data, error) => {
    console.log(data, error);
  },
});

export const cleanProjectsCache = () => queryCache.clear();
