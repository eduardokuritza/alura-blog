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
    const base = category ? `/${category}` : "/";
    const trimmed = (searcher || "").trim();
    const url = trimmed.length ? `${base}?search=${encodeURIComponent(trimmed)}` : base;
    router.push(url);
  };

  let debounceId: any;
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputSearch(value);
    clearTimeout(debounceId);
    debounceId = setTimeout(() => {
      if (value.length === 0 || value.length >= 3) {
        push(value);
      }
    }, 200);
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
        onChange={handleSearch}
        value={inputSearch}
        onKeyDown={handleKeyDown}
        {...props}
      />
      <Image src="/icons/magnifying-glass.svg" alt="Buscar" width={24} height={24} />
    </div>
  );
};

export default InputSearch;
