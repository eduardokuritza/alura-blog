import { FC } from "react";
import Image from "next/image";

const Cover: FC = () => {
  return (
    <section id="introducao" className="relative flex justify-center w-full px-[16px] md:px-[72px] xl:px-[124px]">
      <div className=" relative flex w-full max-w-[686px]  flex-col items-center gap-[54px] pt-[42px] pb-[42px] sm:gap-[108px] sm:pt-[68px] ">
        <div className="relative flex w-full flex-col items-center gap-[24px]">
          <div className="border-primary aspect-square h-auto w-full max-w-[224px] overflow-hidden rounded-full border-[2px]">
            <Image
              className="h-full w-full object-cover"
              src="/images/cover/profile.webp"
              alt="Foto de perfil de Fernanda Mascheti"
              width={224}
              height={224}
            />
          </div>
          <span className="text-primary font-chakra text-center text-base font-bold">Olá, meu nome é Fernanda_</span>
          <h1 className="font-chakra text-primary-300 text-center text-5xl font-bold sm:text-6xl">
            Eu ensino{" "}
            <strong className="from-secondary to-primary bg-gradient-to-r bg-clip-text font-bold text-transparent">
              Programação
            </strong>
          </h1>
          <p className="text-primary-200 text-center text-base">
            Sou Engenheira de Computação e Pedagoga. Ensino pensamento computacional para estudantes do Ensino
            Fundamental e Médio. Ensino sobre pensamento computacional usando HTML, CSS e JavaScript. Veja os projetos
            que já desenvolvi!
          </p>
        </div>
        <div className="flex w-full justify-between gap-[24px]">
          <Image
            className="pointer-events-none w-auto object-contain"
            src="/images/cover/left-border.svg"
            alt=""
            aria-hidden="true"
            width={28}
            height={25}
          />
          <Image
            className="pointer-events-none h-auto object-contain"
            src="/images/cover/mid-border.svg"
            alt=""
            aria-hidden="true"
            width={29}
            height={28}
          />

          <Image
            className="pointer-events-none w-auto object-contain"
            src="/images/cover/right-border.svg"
            alt=""
            aria-hidden="true"
            width={28}
            height={25}
          />
        </div>
      </div>
    </section>
  );
};

export default Cover;
