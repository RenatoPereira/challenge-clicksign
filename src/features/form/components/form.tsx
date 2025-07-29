"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { projectSchema } from "@/database/schemas/project";
import { DatePicker } from "@/components/ui/date-picker";
import { formatInputDate } from "@/lib/date";
import { CalendarIcon } from "lucide-react";
import { Project } from "@/database/schemas/project";
import { useTransition } from "react";
import { toast } from "sonner";
import { InputImage } from "@/components/ui/input-image";

type Props = {
  onSubmit: (data: Project) => void;
  project?: Project | null;
};

export function ProjectForm({ onSubmit, project }: Props) {
  const [isPending, startTransition] = useTransition();

  const INITIAL_VALUES = {
    id: "",
    projectName: "",
    client: "",
    startDate: undefined,
    endDate: undefined,
    projectCover: "",
    favorited: false,
  };

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: project || INITIAL_VALUES,
  });

  const onSubmitForm = (data: Project) => {
    startTransition(async () => {
      try {
        await onSubmit(data);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="space-y-8 w-[702px]"
      >
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required="true">Nome do projeto</FormLabel>
              <FormControl>
                <Input placeholder="Nome do projeto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required="true">Cliente</FormLabel>
              <FormControl>
                <Input placeholder="Cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start gap-10">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel aria-required="true">Data de Início</FormLabel>
                <DatePicker
                  value={
                    field.value ? formatInputDate(field.value as string) : ""
                  }
                  onChange={(date) => field.onChange(date)}
                  disabled={field.disabled}
                >
                  <Button variant="clean" className="w-full relative">
                    <FormControl>
                      <Input
                        value={
                          field.value
                            ? formatInputDate(field.value as string)
                            : ""
                        }
                        onChange={undefined}
                        readOnly
                      />
                    </FormControl>

                    <span className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                      <FormControl>
                        <CalendarIcon className="size-6 text-secondary aria-invalid:text-destructive" />
                      </FormControl>
                      <span className="sr-only">Selecionar data</span>
                    </span>
                  </Button>
                </DatePicker>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel aria-required="true">Data Final</FormLabel>
                <DatePicker
                  value={(field.value as string) ?? undefined}
                  onChange={(date) => field.onChange(date)}
                  disabled={field.disabled}
                >
                  <Button variant="clean" className="w-full relative">
                    <FormControl>
                      <Input
                        value={
                          field.value
                            ? formatInputDate(field.value as string)
                            : ""
                        }
                        onChange={undefined}
                        readOnly
                      />
                    </FormControl>

                    <span className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                      <FormControl>
                        <CalendarIcon className="size-6 text-secondary aria-invalid:text-destructive" />
                      </FormControl>
                      <span className="sr-only">Selecionar data</span>
                    </span>
                  </Button>
                </DatePicker>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="projectCover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capa do Projeto</FormLabel>
              <FormControl>
                <InputImage field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <Input type="hidden" value={field.value} />}
        />
        <FormField
          control={form.control}
          name="favorited"
          render={({ field }) => (
            <Input type="hidden" value={field.value ? "true" : "false"} />
          )}
        />
        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? "Salvando..." : "Salvar projeto"}
        </Button>
      </form>
    </Form>
  );
}
