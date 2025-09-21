// src/app/[category]/[id]/layout.tsx

type LayoutProps = { children: React.ReactNode };

// Permite que rotas não pré-geradas sejam renderizadas em runtime (sem 404 imediato).
export const dynamicParams = true;

// Revalida páginas geradas a cada 60s (ISR).
export const revalidate = 60;

// Se quiser, pode trocar por uma env (ex.: NEXT_PUBLIC_API_BASE_URL)
// mantendo o fallback abaixo.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://nextjs-alura-teste.vercel.app/api";

type PostMinimal = {
  id: string;
  category?: { slug?: string };
};

async function fetchPage(page: number, limit: number) {
  try {
    const res = await fetch(`${API_BASE}/posts?page=${page}&limit=${limit}`, {
      // Em generateStaticParams, "force-cache" já é o padrão, mas deixamos explícito.
      cache: "force-cache"
    });
    if (!res.ok) return null;
    return (await res.json()) as {
      posts?: PostMinimal[];
      pagination?: { totalPages?: number };
    };
  } catch {
    return null;
  }
}

async function getAllPostParams(): Promise<{ category: string; id: string }[]> {
  const limit = 9;

  const first = await fetchPage(1, limit);
  if (!first) return [];

  const totalPages = first.pagination?.totalPages ?? 1;

  const allPosts: PostMinimal[] = [...(first.posts ?? [])];

  // Pagina do 2 até o total
  for (let p = 2; p <= totalPages; p++) {
    const data = await fetchPage(p, limit);
    if (data?.posts?.length) allPosts.push(...data.posts);
  }

  // Mapeia para { category, id } e remove inválidos/duplicados
  const seen = new Set<string>();
  const params: { category: string; id: string }[] = [];

  for (const post of allPosts) {
    const category = post.category?.slug;
    const id = post.id;
    if (!category || !id) continue;
    const k = `${category}__${id}`;
    if (seen.has(k)) continue;
    seen.add(k);
    params.push({ category, id });
  }

  return params;
}

// Gera todas as rotas estáticas conhecidas no build, mas aceita novas em runtime.
export async function generateStaticParams() {
  return getAllPostParams();
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
