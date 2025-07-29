import Link from "next/link";
import { ImArrowLeft2 } from "react-icons/im";

type Props = {
  title: string;
  backHref: string;
};

export const FormHeader = ({ title, backHref }: Props) => {
  return (
    <header className="flex flex-col gap-2">
      <Link href={backHref} className="flex items-center gap-2 text-accent">
        <ImArrowLeft2 className="size-4" /> Voltar
      </Link>

      <h1 className="text-2xl font-bold text-primary">{title}</h1>
    </header>
  );
};
