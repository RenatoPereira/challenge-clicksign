import { Button } from "@/components/ui/button";
import { Input } from "./input";
import { FaUpload } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";
import Image from "next/image";
import { ControllerRenderProps } from "react-hook-form";

interface Props {
  field: ControllerRenderProps<any, any>;
}

export const InputImage = ({ field }: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          field.onChange(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return field.value ? (
    <div className="w-full relative overflow-hidden rounded-lg">
      <Image
        src={field.value}
        alt="Imagem de capa"
        width={702}
        height={395}
        objectFit="cover"
        className="w-full h-full"
      />

      <Button
        variant="secondary"
        size="icon"
        className="absolute top-6 right-6"
        type="button"
        onClick={() => field.onChange("")}
      >
        <FiTrash />
      </Button>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center gap-4 border border-dashed border-input rounded-md p-6 relative">
      <FaUpload className="size-6 text-secondary" />

      <p className="text-secondary text-center mb-2 ">
        Escolha uma imagem .jpg ou .png no seu dispositivo
      </p>

      <Button variant="secondary" className="bg-foreground" type="button">
        Selecionar
      </Button>

      <Input
        className="opacity-0 absolute top-0 left-0 w-full h-full z-50 cursor-pointer"
        type="file"
        accept="image/jpeg, image/png"
        {...field}
        onChange={handleFileChange}
      />
    </div>
  );
};
