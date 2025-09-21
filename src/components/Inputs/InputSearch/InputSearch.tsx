"use client";
import { ComponentProps, FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

type InputSearchProps = ComponentProps<"input"> & {
  category?: string;
};

const InputSearch: FC<InputSearchProps> = ({ category, ...props }) => {
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get("search");
  const [inputSearch, setInputSearch] = useState(search || "");

  const push = (searcher = inputSearch) => {
    router.push(
      searcher ? `/${category ? `/${category}?` : "?"}?search=${searcher}` : `/${category ? `${category}` : ""}`
    );
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearch((prev) => {
      if (prev.length < 3 && !search) return e.target.value;
      setTimeout(() => push(e.target.value), 150);
      return e.target.value;
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      push();
    }
  };

  return (
    <div className="border-primary focus-within:outline-primary relative flex w-full items-center justify-between gap-[8px] rounded-[4px] border bg-white px-[14px] py-[8px] focus-within:outline md:max-w-[320px]">
      <input
        className="placeholder:font-base placeholder:text-primary-300 w-full bg-transparent text-base focus:outline-none"
        placeholder="Buscar..."
        value={inputSearch}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        {...props}
      />
      <Image src="/icons/magnify-glass.svg" alt="Ícone de busca" width={24} height={24} />
    </div>
  );
};

export default InputSearch;
