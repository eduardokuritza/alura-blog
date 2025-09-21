import { PostsListResponse, SinglePostResponse } from "@/@types/posts";
import api, { prepareParams } from "./api";

export async function getPosts({ queryKey }: any) {
  const [, filter] = queryKey as [
    string,
    {
      page: number;
      limit: number;
      category?: string;

      search?: string;
    }
  ];
  const page = filter?.page ?? 1;
  const limit = filter?.limit ?? 9;

  const path = filter?.category ? `/category/${filter.category}` : "";

  try {
    const { data } = await api.get(
      path,
      prepareParams({ page, limit, ...(filter?.search ? { search: filter.search } : {}) })
    );
    return data as PostsListResponse;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
}

export async function getPostById(id: string) {
  try {
    const { data } = await api.get(`/id/${id}`);
    return data as SinglePostResponse;
  } catch (error) {
    console.error(`Erro ao buscar post com ID ${id}:`, error);
    throw error;
  }
}
