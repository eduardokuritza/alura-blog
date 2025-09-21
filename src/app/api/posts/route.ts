import { NextRequest, NextResponse } from "next/server";

const baseURL = "https://nextjs-alura-teste.vercel.app/api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "9";

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const totalPages = Math.ceil(45 / limitNum);
    if (pageNum > totalPages) {
      return NextResponse.json(
        { error: `Página ${pageNum} não existe. Máximo: ${totalPages} páginas` },
        { status: 400 }
      );
    }

    const upstream = new URL(`${baseURL}/posts`);
    upstream.searchParams.set("page", page);
    upstream.searchParams.set("limit", limit);

    const response = await fetch(upstream.toString());

    if (!response.ok) {
      throw new Error(`API retornou status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
