import { NextRequest, NextResponse } from "next/server";

const baseURL = "https://nextjs-alura-teste.vercel.app/api";

const validCategories = ["mobile", "programacao", "frontend", "devops", "ux-design", "data-science", "inovacao-gestao"];

// Normaliza strings removendo acentos e caixa
const normalize = (s: string) =>
  (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

type UpstreamPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  category?: { slug?: string; name?: string };
  tags?: { slug?: string; name?: string }[];
  imageUrl?: string;
};

type UpstreamPage = {
  posts: UpstreamPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    postsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  meta?: Record<string, unknown>;
};

async function fetchUpstreamCategoryPage(category: string, page: number, limit: number): Promise<UpstreamPage> {
  const upstream = new URL(`${baseURL}/posts/category/${category}`);
  upstream.searchParams.set("page", String(page));
  upstream.searchParams.set("limit", String(limit));
  const res = await fetch(upstream.toString());
  if (!res.ok) throw new Error(`Upstream falhou: ${res.status}`);
  return res.json();
}

function filterPosts(posts: UpstreamPost[], needle: string): UpstreamPost[] {
  const n = normalize(needle.trim());
  if (n.length < 3) return posts;
  return posts.filter((p) => {
    const haystack = [
      p.title,
      p.content,
      p.author,
      p.category?.name,
      p.category?.slug,
      ...(p.tags?.map((t) => t.name) ?? []),
      ...(p.tags?.map((t) => t.slug) ?? [])
    ]
      .filter(Boolean)
      .map((x) => normalize(String(x)))
      .join(" ");
    return haystack.includes(n);
  });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  try {
    const { category } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "9", 10), 1), 9); // 1..9
    const search = (searchParams.get("search") || "").trim();

    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: `Categoria '${category}' não encontrada. Categorias válidas: ${validCategories.join(", ")}` },
        { status: 404 }
      );
    }

    // Sem busca: proxy simples
    if (search.length < 3) {
      const upstream = new URL(`${baseURL}/posts/category/${category}`);
      upstream.searchParams.set("page", String(page));
      upstream.searchParams.set("limit", String(limit));
      const response = await fetch(upstream.toString());
      if (!response.ok) {
        if (response.status === 404) {
          return NextResponse.json({ error: `Categoria '${category}' não encontrada` }, { status: 404 });
        }
        throw new Error(`API retornou status ${response.status}`);
      }
      const data = await response.json();
      return NextResponse.json(data);
    }

    // Com busca: agregar todas as páginas da categoria, filtrar e paginar
    const upstreamLimit = 9;
    const firstPage = await fetchUpstreamCategoryPage(category, 1, upstreamLimit);
    const totalPages = firstPage.pagination?.totalPages ?? Math.ceil(45 / upstreamLimit);

    let allPosts: UpstreamPost[] = [...(firstPage.posts || [])];
    const promises: Promise<UpstreamPage>[] = [];
    for (let p = 2; p <= totalPages; p++) {
      promises.push(fetchUpstreamCategoryPage(category, p, upstreamLimit));
    }
    if (promises.length) {
      const rest = await Promise.all(promises);
      for (const pageData of rest) {
        allPosts.push(...(pageData.posts || []));
      }
    }

    const filtered = filterPosts(allPosts, search);
    const totalFiltered = filtered.length;
    const totalPagesFiltered = Math.max(1, Math.ceil(totalFiltered / limit));
    const currentPage = Math.min(Math.max(1, page), totalPagesFiltered);
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const pageSlice = filtered.slice(start, end);

    return NextResponse.json({
      posts: pageSlice,
      pagination: {
        currentPage,
        totalPages: totalPagesFiltered,
        totalPosts: totalFiltered,
        postsPerPage: limit,
        hasNextPage: currentPage < totalPagesFiltered,
        hasPreviousPage: currentPage > 1
      },
      meta: {
        generatedAt: new Date().toISOString(),
        seed: `category-${category}-search-${search}-page-${currentPage}-limit-${limit}`,
        category
      }
    });
  } catch (error) {
    console.error("Erro ao buscar posts por categoria:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
