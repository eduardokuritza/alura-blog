import slugify from "@/utils/slugfy";

export const API_BASE = "https://nextjs-alura-teste.vercel.app/api";

export type PostMinimal = {
  id: string;
  category?: { slug?: string };
  title?: string;
};

// ==== Querystring helpers ====
export function getSearchParam(url: URL): string | null {
  const value = url.searchParams.get("search");
  const trimmed = (value || "").trim();
  return trimmed.length ? trimmed : null;
}

export function applySearchParam(upstream: URL, search: string | null | undefined) {
  if (search) {
    upstream.searchParams.set("search", search);
  }
}

// ==== Server-side search helpers (mantidos) ====
export function shouldServerFilter(search?: string | null) {
  return !!(search && search.trim().length >= 3);
}

/**
 * Helper interno para buscar TODAS as páginas de /posts
 * Mantém o limite de 9 por página (cap da API) para reduzir requisições.
 */
async function fetchAllPosts(
  endpoint: string,
  perPage = 9
): Promise<{
  posts: any[];
  pagination: { totalPages: number } | undefined;
  meta: Record<string, unknown> | undefined;
}> {
  // primeira página
  const first = new URL(endpoint);
  first.searchParams.set("page", "1");
  first.searchParams.set("limit", String(perPage));

  const firstRes = await fetch(first.toString(), { cache: "force-cache" });
  if (!firstRes.ok) throw new Error(`Upstream status ${firstRes.status}`);
  const firstData = await firstRes.json();

  const totalPages: number = firstData?.pagination?.totalPages ?? 1;
  let posts: any[] = Array.isArray(firstData?.posts) ? firstData.posts : [];

  // demais páginas (se existirem)
  if (totalPages > 1) {
    const tasks: Promise<any[]>[] = [];
    for (let p = 2; p <= totalPages; p++) {
      const u = new URL(endpoint);
      u.searchParams.set("page", String(p));
      u.searchParams.set("limit", String(perPage));
      tasks.push(
        fetch(u.toString(), { cache: "force-cache" })
          .then((r) => r.json())
          .then((d) => (Array.isArray(d?.posts) ? d.posts : []))
      );
    }
    const batches = await Promise.all(tasks);
    for (const batch of batches) posts = posts.concat(batch);
  }

  return {
    posts,
    pagination: firstData?.pagination,
    meta: firstData?.meta
  };
}

/**
 * Filtra por título e pagina localmente o resultado filtrado.
 */
export async function fetchAllPostsAndFilter(endpoint: string, search: string, pageNum: number, limitNum: number) {
  const { posts: allPosts, meta } = await fetchAllPosts(endpoint, 9);

  const term = search.toLowerCase();
  const filtered = allPosts.filter((p) =>
    String(p?.title || "")
      .toLowerCase()
      .includes(term)
  );

  const totalPosts = filtered.length;
  const totalPagesFiltered = Math.max(1, Math.ceil(totalPosts / limitNum));
  const currentPage = Math.min(Math.max(1, pageNum), totalPagesFiltered);
  const start = (currentPage - 1) * limitNum;
  const pagePosts = filtered.slice(start, start + limitNum);

  return {
    posts: pagePosts,
    pagination: {
      currentPage,
      totalPages: totalPagesFiltered,
      totalPosts,
      postsPerPage: limitNum,
      hasNextPage: currentPage < totalPagesFiltered,
      hasPreviousPage: currentPage > 1
    },
    meta: {
      ...(meta ?? {}),
      seed: `search-${term}-page-${currentPage}-limit-${limitNum}`
    }
  };
}

/**
 * Novo: obtém todos os params estáticos (category/id) deduplicados
 * para geração de rotas.
 */
export async function getAllPostParams(): Promise<{ category: string; id: string }[]> {
  const { posts } = await fetchAllPosts(`${API_BASE}/posts`, 9);

  const seen = new Set<string>();
  const params: { category: string; id: string }[] = [];

  for (const p of posts as PostMinimal[]) {
    const category = p?.category?.slug;

    const slug = slugify(p?.title || "");
    if (!category || !slug) continue;
    const k = `${category}__${slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    params.push({ category, id: slug });
  }

  return params;
}
