"use client";

import { useProjectsData } from "@/lib/hooks/projects-data.hook";

type Props = {
  title: string;
  description: string;
};

export const ErrorState = ({ title, description }: Props) => {
  const { isError, error } = useProjectsData();

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center gap-6 flex-1 rounded-sm bg-foreground text-center px-4">
        <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        <p className="text-base text-secondary">{description}</p>
        {error && <p className="text-base text-secondary">{error?.message}</p>}
      </div>
    );

  return null;
};
