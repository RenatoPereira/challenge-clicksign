import Link from "next/link";
import Image from "next/image";

import LogoImage from "@/assets/logo.svg";
import { Search } from "@/components/search";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-1 px-16 z-40 drop-shadow-lg drop-shadow-black/25 bg-[#1C1930]">
      <span className="w-px" />

      <Link href="/">
        <Image
          src={LogoImage}
          alt="Logo Gerenciador de Projetos"
          width={193}
          height={72}
          priority
        />
      </Link>

      <span className="w-px flex justify-end">
        <Search />
      </span>
    </nav>
  );
};
