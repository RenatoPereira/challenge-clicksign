"use client";

import { Button } from "@/components/ui/button";
import { useProjectsData } from "@/lib/hooks/projects-data.hook";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  button: {
    href: string;
    label: string;
    icon?: React.ReactNode;
  };
};

export const EmptyState = ({ title, description, button }: Props) => {
  const { data, isPending, isError } = useProjectsData();

  if (isPending || isError || data?.length !== 0) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-6 flex-1 rounded-sm bg-foreground text-center px-4">
      <h1 className="text-2xl font-semibold text-primary">{title}</h1>
      <p className="text-base text-secondary">{description}</p>

      <Link href="/new" className="mt-2">
        <Button size="lg">
          {button.icon}
          {button.label}
        </Button>
      </Link>
    </div>
  );
};
