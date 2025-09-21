import { FC } from "react";
import { PostsListResponse } from "@/@types/posts";
import Image from "next/image";
import Card from "@/components/Card/Card";

interface RelatedPostsProps {
  relatedPosts?: PostsListResponse;
}

const RelatedPosts: FC<RelatedPostsProps> = ({ relatedPosts }) => {
  return (
    <section className="relative flex flex-col items-center w-full pt-[24px] gap-[32px] sm:gap-[40px] px-[16px] md:px-[72px] xl:px-[124px]">
      <Image
        className="absolute inset-0 z-[-1] object-cover overflow-visible pointer-events-none opacity-70"
        src="/images/radial-bg.svg"
        alt=""
        aria-hidden="true"
        fill
      />
      <h2 className="font-chakra text-primary-300 text-2xl font-bold text-nowrap w-full">Postagens relacionadas</h2>
      <div className="grid w-full grid-cols-1 gap-[24px]  lg:grid-cols-3">
        {!!relatedPosts?.posts.length ? (
          relatedPosts?.posts.map((post) => <Card key={post.id} post={post} />)
        ) : (
          <div className="row-span-2 col-span-3 flex w-full items-center justify-center min-h-[940px]">
            <p className="text-primary-300 ">Nenhum post encontrado</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedPosts;
