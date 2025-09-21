import { NextRequest, NextResponse } from "next/server";

const baseURL = "https://nextjs-alura-teste.vercel.app/api";

const validCategories = ["mobile", "programacao", "frontend", "devops", "ux-design", "data-science", "inovacao-gestao"];

export async function GET(request: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  try {
    const { category } = await params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "9";

    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: `Categoria '${category}' não encontrada. Categorias válidas: ${validCategories.join(", ")}` },
        { status: 404 }
      );
    }

    const upstream = new URL(`${baseURL}/posts/category/${category}`);
    upstream.searchParams.set("page", page);
    upstream.searchParams.set("limit", limit);

    const response = await fetch(upstream.toString());

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: `Categoria '${category}' não encontrada` }, { status: 404 });
      }
      throw new Error(`API retornou status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar posts por categoria:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
