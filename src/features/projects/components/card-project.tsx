"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardAction,
  CardContent,
  CardTitle,
  CardDescription,
  CardData,
} from "@/components/ui/card";
import { Project } from "@/database/schemas/project";
import { formatDate } from "@/lib/date";
import { LuEllipsis } from "react-icons/lu";
import { PiCalendarDotsLight, PiCalendarCheckLight } from "react-icons/pi";
import Image from "next/image";
import EmptyProjectImage from "@/assets/project-empty.png";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { AlertDelete } from "./alert-delete";
import { ActionFavorite } from "./action-favorite";
import { HighlightText } from "@/components/highlight-text";

type ActionProps = {
  project: Project;
};

const ProjectCardDropActions = ({ project }: ActionProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit/${project.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="drop-shadow-lg drop-shadow-black/25"
        >
          <LuEllipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuArrow className="fill-popover" />
        <DropdownMenuItem onSelect={handleEdit}>
          <FiEdit className="size-6 text-popover-foreground" /> Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDelete project={project} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type Props = {
  project: Project;
  highlight?: string;
};

export const ProjectCard = ({ project, highlight }: Props) => {
  return (
    <Card>
      <CardHeader className="relative overflow-hidden w-full h-[231px]">
        <Image
          src={project.projectCover || EmptyProjectImage.src}
          alt={project.projectName}
          fill
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <CardAction>
          <ActionFavorite project={project} />
          <ProjectCardDropActions project={project} />
        </CardAction>
      </CardHeader>

      <CardContent>
        <CardTitle>
          <HighlightText highlightText={highlight}>
            {project.projectName}
          </HighlightText>
        </CardTitle>
        <CardDescription>
          <strong className="font-bold">Client:</strong>{" "}
          <HighlightText highlightText={highlight}>
            {project.client}
          </HighlightText>
        </CardDescription>

        <CardData>
          <p className="flex items-center gap-4 text-secondary">
            <PiCalendarDotsLight className="size-6" />
            {formatDate(project.startDate)}
          </p>
          <p className="flex items-center gap-4 text-secondary">
            <PiCalendarCheckLight className="size-6" />
            {formatDate(project.endDate)}
          </p>
        </CardData>
      </CardContent>
    </Card>
  );
};
