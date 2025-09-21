import Image from "next/image";
import { FC } from "react";

const Contact: FC = () => {
  return (
    <section className="relative flex w-full max-w-[1440px] items-center py-[24px] justify-between gap-[24px] px-[16px] md:px-[72px] xl:px-[124px]">
      <div className="flex w-full flex-col justify-center gap-[12px]">
        <span className="font-chakra text-primary font-bold text-base">Vamos conversar?</span>
        <h2 className="font-chakra text-primary-300 font-bold text-6xl">Entre em contato</h2>
      </div>
      <div className="flex flex-col justify-center gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <div className="flex h-[24px] w-[24px] items-center justify-center aspect-square ">
            <Image
              className="object-contain w-full h-full"
              src="/icons/mail.svg"
              alt="Ícone de e-mail"
              width={24}
              height={24}
            />
          </div>
          <span className="text-primary-200 text-base">fernandamascheti@gmail.com</span>
        </div>
        {/*  */}
        <div className="flex items-center gap-[8px]">
          <div className="flex h-[24px] w-[24px] items-center justify-center aspect-square ">
            <Image
              className="object-contain w-full h-full"
              src="/icons/linkedin.svg"
              alt="Ícone do LinkedIn"
              width={24}
              height={24}
            />
          </div>
          <a
            href="https://br.linkedin.com/in/femascheti"
            title="Perfil de LinkedIn de Fernanda Mascheti"
            target="_blank"
            className="text-primary-200 text-base underline hover:text-primary-100 focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2 transition-all"
          >
            fernandamascheti
          </a>
        </div>
        <div className="flex items-center gap-[8px]">
          <div className="flex h-[24px] w-[24px] items-center justify-center aspect-square ">
            <Image
              className="object-contain w-full h-full"
              src="/icons/github.svg"
              alt="Ícone do GitHub"
              width={24}
              height={24}
            />
          </div>
          <a
            href="https://github.com/femascheti"
            title="Perfil do GitHub de Fernanda Mascheti"
            target="_blank"
            className="text-primary-200 text-base underline hover:text-primary-100 focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2 transition-all"
          >
            fernandamascheti
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
