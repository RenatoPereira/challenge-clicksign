"use client";

import { useSearchStore } from "@/lib/stores/search.store";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { PiClockCounterClockwiseLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ItemProps {
  item: string;
  searchBy: (by: string) => void;
}

export const SearchItem = ({ item, searchBy }: ItemProps) => {
  const clearFromHistory = useSearchStore((state) => state.clearFromHistory);

  const handleClick = () => {
    searchBy(item);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    clearFromHistory(item);
  };

  return (
    <li
      key={item}
      onClick={handleClick}
      className="flex items-center gap-4 bg-foreground py-[18px] px-6 border-b border-border last:border-b-0 cursor-pointer text-secondary text-base"
    >
      <PiClockCounterClockwiseLight className="size-6" />

      {item}

      <Button
        variant="ghost"
        size="icon"
        className="ml-auto"
        onClick={handleClear}
        type="button"
      >
        <RxCross2 className="size-6" />
      </Button>
    </li>
  );
};

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const history = useSearchStore((state) => state.history);
  const router = useRouter();

  const onSearch = (item: string) => {
    router.push(`/search/${item}`);
    close();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim().length > 1 && value.trim().length < 3) {
      toast("Digite pelo menos 3 caracteres");
      return;
    }

    onSearch(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const close = () => {
    setOpen(false);
    setValue("");
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((state: boolean) => !state)}
      >
        <SearchIcon />
      </Button>

      {open && (
        <div className="bg-foreground absolute top-0 left-0 w-full h-full flex items-center justify-center px-6 z-50">
          <form onSubmit={onSubmit} className="flex items-center w-full h-full">
            <Button
              variant="ghost"
              size="icon"
              type="submit"
              className="text-accent px-0"
            >
              <SearchIcon />
            </Button>

            <Input
              type="text"
              placeholder="Digite o nome do projeto"
              value={value}
              onChange={handleSearch}
              className="w-full h-full border-none focus-visible:ring-0"
              autoFocus
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={close}
              className="text-accent"
            >
              <RxCross2 className="size-6" />
            </Button>
          </form>

          {history.length > 0 && (
            <ul className="absolute top-full left-0 w-full h-full">
              {history.map((item) => (
                <SearchItem key={item} searchBy={onSearch} item={item} />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};
