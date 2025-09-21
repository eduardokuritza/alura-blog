export interface Category {
  slug: string;
  name: string;
  description?: string;
}

export interface Tag {
  slug: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  category: Category;
  tags: Tag[];
  imageUrl: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ListMeta {
  generatedAt: string;
  seed: string;
  category?: string;
  tag?: string;
}

export interface SingleMeta {
  generatedAt: string;
  seed: string;
}

export interface PostsListResponse {
  posts: Post[];
  pagination: Pagination;
  meta: ListMeta;
}

export interface SinglePostResponse {
  post: Post;
  meta: SingleMeta;
}
