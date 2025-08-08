"use client";

import { useProjectsData } from "@/lib/hooks/projects-data.hook";

type Props = {
  message: string;
};

export const LoadingState = ({ message }: Props) => {
  const { isPending } = useProjectsData();

  if (isPending)
    return (
      <div className="flex flex-col items-center justify-center gap-6 flex-1 rounded-sm bg-foreground text-center px-4">
        <h1 className="text-2xl font-semibold text-primary">{message}</h1>
      </div>
    );

  return null;
};
