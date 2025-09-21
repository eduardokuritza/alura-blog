import { NextRequest, NextResponse } from "next/server";

const baseURL = "https://nextjs-alura-teste.vercel.app/api";

const validTags = [
  "tecnologia",
  "programacao",
  "web",
  "mobile",
  "design",
  "negocios",
  "startup",
  "inovacao",
  "frontend",
  "backend",
  "devops",
  "data-science"
];

export async function GET(request: NextRequest, { params }: { params: Promise<{ tag: string }> }) {
  try {
    const { tag } = await params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "9";

    if (!validTags.includes(tag)) {
      return NextResponse.json(
        { error: `Tag '${tag}' não encontrada. Tags válidas: ${validTags.join(", ")}` },
        { status: 404 }
      );
    }

    const upstream = new URL(`${baseURL}/posts/tags/${tag}`);
    upstream.searchParams.set("page", page);
    upstream.searchParams.set("limit", limit);

    const response = await fetch(upstream.toString());

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: `Tag '${tag}' não encontrada` }, { status: 404 });
      }
      throw new Error(`API retornou status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar posts por tag:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
