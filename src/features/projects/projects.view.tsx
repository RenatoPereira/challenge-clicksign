"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { PiPlusCircle } from "react-icons/pi";
import { ProjectsContainer } from "./projects.container";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

export const ProjectsView = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ProjectsContainer />
      <EmptyState
        title="Nenhum projeto"
        description="Clique no botão abaixo para criar o primeiro e gerenciá-lo"
        button={{
          href: "/new",
          label: "Novo Projeto",
          icon: <PiPlusCircle className="size-5" />,
        }}
      />
      <ErrorState title="Erro" description="Erro ao carregar os projetos" />
      <LoadingState message="Carregando..." />
    </QueryClientProvider>
  );
};
