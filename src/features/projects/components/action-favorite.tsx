import { useRouter } from "next/navigation";
import projectService from "@/lib/services/project.service";
import { toast } from "sonner";
import { useTransition } from "react";
import { Project } from "@/database/schemas/project";
import { Button } from "@/components/ui/button";
import { BsStar, BsStarFill } from "react-icons/bs";

type Props = {
  project: Project;
};

export const ActionFavorite = ({ project }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleEdit = () => {
    startTransition(async () => {
      try {
        const response = await projectService.toggleFavorite(project.id!);
        router.refresh();
        toast.success(
          response.favorited
            ? "Projeto favoritado com sucesso!"
            : "Projeto desfavoritado com sucesso!"
        );
      } catch (error: Error | unknown) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Erro ao favoritar projeto"
        );
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleEdit}
      disabled={isPending}
    >
      {project.favorited ? (
        <BsStarFill className="size-5 drop-shadow-lg drop-shadow-black/25 text-[#FFB23D]" />
      ) : (
        <BsStar className="size-5 drop-shadow-lg drop-shadow-black/25 text-primary-foreground" />
      )}
    </Button>
  );
};
