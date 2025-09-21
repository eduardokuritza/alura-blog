import { FC } from "react";
import { ToggleTheme } from "../Toggle/ToggleTheme/ToggleTheme";
import Link from "next/link";
import Image from "next/image";
import ButtonLink from "../Buttons/ButtonLink";

const Header: FC = () => {
  return (
    <header className="relative flex w-full max-w-[1440px] items-center justify-between gap-[40px] px-[16px] pt-[16px] md:px-[72px] md:pt-[72px] xl:px-[124px] xl:pt-[72px] ">
      <div className="flex items-center gap-[12px] md:gap-[20px]">
        <Link
          href="/"
          target="_self"
          title="Ir para a página inicial"
          className="focus-visible:outline-primary min-w-[46px] rounded-xs transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Image
            className="aspect-square object-contain object-center"
            src="/icon.png"
            alt="Logo"
            width={46}
            height={46}
          />
        </Link>
        <span className="font-chakra text-primary-300 text-md font-bold md:text-2xl">Fernanda Mascheti</span>
      </div>
      <nav aria-label="Navegação principal" className="flex items-center gap-3 md:gap-8">
        <ul className="flex items-center gap-3 md:gap-8">
          <li>
            <ButtonLink href="/" size="lg" aria-current="page">
              Início
            </ButtonLink>
          </li>
          <li>
            <ButtonLink href="#blog" size="lg">
              Blog
            </ButtonLink>
          </li>
          <li>
            <ToggleTheme />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
