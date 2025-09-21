import { FC } from "react";
import type { Post } from "@/@types/posts";
import Image from "next/image";
import Tag from "@/components/Tag/Tag";
import ButtonLink from "@/components/Buttons/ButtonLink";

interface PostProps {
  post: Post;
}

const Post: FC<PostProps> = ({ post }) => {
  return (
    <section className="relative flex flex-col items-center w-full pb-[24px] gap-[32px]  sm:gap-[64px] pt-[48px] xl:pt-[104px] px-[16px] md:px-[72px] xl:px-[124px]">
      <div className="flex w-full justify-center gap-[16px] sm:gap-[24px] flex-col-reverse md:flex-row">
        <div className="flex w-full flex-col gap-[16px] sm:gap-[24px]">
          <h1 className="font-chakra text-primary-300 font-bold text-4xl sm:text-5xl text-balance">{post?.title}</h1>
          <div className="flex w-full flex-col gap-[16px] sm:gap-[24px]">
            <span className="text-base text-primary-200 font-bold">Categoria:</span>
            <div className="flex items-center gap-[12px]">
              <ButtonLink href={`/${post?.category?.slug}`} variant="secondary" children={post?.category?.name} />
            </div>
          </div>
          <div className="flex w-full flex-col gap-[16px] sm:gap-[24px]">
            <span className="text-base text-primary-200 font-bold">Tags:</span>
            <div className="flex items-center gap-[12px] flex-wrap">
              {post?.tags?.map((tag) => (
                <Tag key={tag.slug} text={tag.name} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full aspect-[608/358] overflow-hidden">
          {post?.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post?.category?.description || "Imagem do post"}
              className="w-full object-cover"
              width={608}
              height={358}
              unoptimized
            />
          ) : null}
        </div>
      </div>
      <div className="flex w-full">
        <p className="text-base text-primary-200">{post?.content}</p>
      </div>
    </section>
  );
};

export default Post;
