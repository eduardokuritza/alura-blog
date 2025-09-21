import { NextRequest, NextResponse } from "next/server";

const baseURL = "https://nextjs-alura-teste.vercel.app/api";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id || id.trim() === "") {
      return NextResponse.json({ error: "ID do post é obrigatório" }, { status: 400 });
    }

    const upstream = new URL(`${baseURL}/posts/id/${id}`);

    const response = await fetch(upstream.toString());

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: `Post com ID '${id}' não encontrado` }, { status: 404 });
      }
      throw new Error(`API retornou status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar post por ID:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
