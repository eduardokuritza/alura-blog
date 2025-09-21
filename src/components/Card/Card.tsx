import { FC } from "react";
import { Post } from "@/@types/posts";
import Link from "next/link";
import Image from "next/image";
import ButtonLink from "../Buttons/ButtonLink";

interface CardProps {
  post: Post;
}

const Card: FC<CardProps> = ({ post }) => {
  return (
    <div className="border-primary relative flex w-full flex-col items-center gap-[26px] rounded-sm border bg-white p-[24px] transition-all hover:shadow-[0_4px_44px_rgba(28,127,200,0.3)]">
      <Link
        className="focus-visible:outline-primary relative aspect-[333/196] w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
        href={`/${post.category.slug}/${post.id}`}
        aria-label="Ir para a postagem"
      >
        <Image
          src={post?.imageUrl}
          alt=""
          className="h-full w-full object-cover object-center transition-all hover:scale-105"
          width={333}
          height={196}
          unoptimized
        />
        <div className="bg-primary pointer-events-none absolute right-0 bottom-0 max-w-[85%] min-w-[130px] px-[24px] py-[6px] text-center">
          <span className="font-chakra line-clamp-1 text-sm font-bold text-white">{post?.category.name}</span>
        </div>
      </Link>
      <h3 className="font-chakra text-primary-300 line-clamp-2 text-xl font-bold w-full">{post?.title}</h3>
      <p className="text-primary-200 line-clamp-3 text-base w-full">{post?.content}</p>
      <div className="self-start">
        <ButtonLink href={`/${post.category.slug}/${post.id}`} title="Ler mais">
          Ler mais
        </ButtonLink>
      </div>
    </div>
  );
};

export default Card;
