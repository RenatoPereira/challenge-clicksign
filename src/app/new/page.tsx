import { FormHeader } from "@/features/form/components/header";
import { FormSubmitContainer } from "@/features/form/containers/form-submit.container";

export default async function NewProject() {
  return (
    <>
      <FormHeader title="Novo Projeto" backHref="/" />

      <section className="border rounded-lg flex flex-col items-center justify-center gap-4 py-13 px-4">
        <FormSubmitContainer />
      </section>
    </>
  );
}
