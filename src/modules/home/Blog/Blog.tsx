"use client";
import { FC, useState } from "react";
import { Post } from "@/@types/posts";
import { getPosts } from "@/lib/posts";
import { categories } from "@/mock/categories";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Card from "@/components/Card/Card";
import ButtonLink from "@/components/Buttons/ButtonLink";
import Pagination from "@/components/Pagination/Pagination";
import InputSearch from "@/components/Inputs/InputSearch/InputSearch";

type BlogProps = {
  category?: string;
};

const Blog: FC<BlogProps> = ({ category }) => {
  const params = useSearchParams();
  const urlSearch = params.get("search") || "";
  const [searchText, setSearchText] = useState(urlSearch);
  const [page, setPage] = useState(1);

  const { data: allPosts, isLoading } = useQuery({
    queryKey: [
      "posts",
      {
        page,
        limit: 6,
        ...(category ? { category } : {}),
        ...(searchText.trim().length >= 3 ? { search: searchText.trim() } : {})
      }
    ],
    queryFn: getPosts
  });

  return (
    <section
      id="blog"
      className="relative flex w-full flex-col items-center gap-[32px] px-[16px] pt-[42px] pb-[60px] md:px-[72px] xl:px-[124px]"
    >
      <div className="relative flex w-full flex-col items-start gap-[24px] xl:flex-row xl:gap-[64px]">
        <div className="relative flex w-full flex-col gap-[8px] sm:flex-row sm:items-center sm:gap-[24px] xl:gap-[32px]">
          <h2 className="font-chakra text-primary-300 text-2xl font-bold text-nowrap">Minhas postagens</h2>
          <InputSearch value={searchText} onChange={(e) => setSearchText(e.target.value)} {...{ category }} />
        </div>

        <div className="relative flex flex-wrap w-full items-center gap-[16px] overflow-x-auto xl:justify-end">
          <span className="text-primary-300 text-base font-bold">Categorias:</span>
          {categories.map((cat) => (
            <ButtonLink key={cat.value} href={`/${cat.value}`} variant="secondary">
              {cat.label}
            </ButtonLink>
          ))}
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="row-span-2 col-span-3 flex w-full items-center justify-center min-h-[940px]">
            <p className="text-primary-300 ">Carregando...</p>
          </div>
        ) : !!allPosts?.posts.length ? (
          allPosts?.posts.map((post: Post) => <Card key={post.id} post={post} />)
        ) : (
          <p className="text-primary-300">Nenhum post encontrado</p>
        )}
      </div>
      <Pagination pagination={allPosts?.pagination} onPageChange={setPage} />
    </section>
  );
};

export default Blog;
