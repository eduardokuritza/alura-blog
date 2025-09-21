"use client";
import { FC } from "react";
import { getPostById, getPosts } from "@/lib/posts";
import type { Post as IPost } from "@/@types/posts";
import { useQueries } from "@tanstack/react-query";
import Post from "./Post/Post";
import RelatedPosts from "./RelatedPosts/RelatedPosts";

interface SingleProps {
  category: string;
  id: string;
}

const Single: FC<SingleProps> = ({ category, id }) => {
  const [{ data, isLoading: isLoadingPost }, { data: relatedPosts, isLoading: isLoadingRelatedPosts }] = useQueries({
    queries: [
      { queryKey: ["post"], queryFn: () => getPostById(id), enabled: !!id },
      {
        queryKey: ["relatedPosts", { page: 1, limit: 3, ...(category ? { category } : {}) }],
        queryFn: getPosts
      }
    ]
  });

  return (
    <main
      id="single"
      tabIndex={-1}
      className="relative flex w-full max-w-[1440px] flex-col items-center focus:outline-none"
    >
      <Post post={(data as { post: IPost })?.post} />
      <RelatedPosts {...{ relatedPosts }} />
    </main>
  );
};

export default Single;
