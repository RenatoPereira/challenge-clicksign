import { useRouter } from "next/navigation";
import projectService from "@/lib/services/project.service";
import { toast } from "sonner";
import { useTransition } from "react";
import { Project } from "@/database/schemas/project";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsStar } from "react-icons/bs";

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
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "text-primary-foreground",
        project.favorited && "text-yellow-500"
      )}
      onClick={handleEdit}
      disabled={isPending}
    >
      <BsStar
        className={cn(
          "size-5 drop-shadow-lg drop-shadow-black/25",
          project.favorited && "text-yellow-500"
        )}
      />
    </Button>
  );
};
