import { Project } from "@/database/schemas/project";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogPortal,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FiTrash } from "react-icons/fi";
import { useTransition } from "react";
import projectService from "@/lib/services/project.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  project: Project;
};

export const AlertDelete = ({ project }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSelect = (event: Event) => {
    event.preventDefault();
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await projectService.deleteProject(project.id!);
        router.refresh();
        toast.success("Projeto removido com sucesso!");
      } catch (error: Error | unknown) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Erro ao remover projeto"
        );
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={onSelect}>
          <FiTrash className="size-6 text-popover-foreground" /> Remover
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogPortal>
        <AlertDialogContent>
          <AlertDialogHeader>
            <span className="block -mt-16 rounded-full size-16 flex items-center justify-center bg-popover-foreground shadow-lg shadow-black/25">
              <FiTrash className="size-5 text-popover" />
            </span>

            <AlertDialogTitle>Remover projeto?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação removerá definitivamente o projeto:
              <strong className="block text-center text-muted text-2xl font-medium">
                {project.projectName}
              </strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending}>
              {isPending ? "Removendo..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};
