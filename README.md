# Alura Blog — Case Técnico (Frontend | Next.js)

Aplicação desenvolvida para o case técnico da Alura. O objetivo foi construir uma listagem de postagens com página de detalhes, seguindo o design do Figma, consumindo a API fake e aplicando boas práticas de SEO, acessibilidade, performance e componentização.

## ▶️ Como rodar localmente

Pré-requisitos: Node 18+ e pnpm/yarn/npm.

1. Instale dependências

   ```bash
   yarn
   ```

2. Execute em desenvolvimento

   ```bash
   yarn run dev
   ```

3. Acesse: http://localhost:3000

Build de produção:

```bash
yarn build && yarn run dev
```

## ✅ Stack e Principais Decisões

- Next.js 15 (App Router) + Turbopack
- TypeScript com tipagem segura (tipos em `src/@types`)
- Tailwind CSS v4 (config sob `tailwind.config.ts` e tokens via CSS vars)
- React Query (TanStack) para cache, revalidação e estados de requisição
- next-themes para Dark/Light mode (preferência do sistema e toggle manual)
- Sass para utilidades globais e theming complementar

## 🎯 Requisitos do Case — Como foram atendidos

- Utilizar Next.js 15 com App Router: OK (estrutura em `src/app`)
- TypeScript com tipagem segura: OK (`src/@types/posts.d.ts` e uso estrito)
- Tailwind 4 para estilização: OK (v4.1.x)
- Consumir API fake: OK (axios + baseURL, endpoints mapeados)
- Boas práticas de SEO: OK (metadata, lang, viewport, ícones, fonte otimizada)
- Boas práticas de Acessibilidade: OK (nav com aria-label, foco visível, botões semanticamente corretos, imagens com alt)
- Fidelidade ao Figma: Layout implementado e responsivo
- Layout 100% responsivo: Grid e utilitários responsivos
- Performance e carregamento rápido: Turbopack, cache do React Query, componentes leves
- Diferencial: Tema claro/escuro implementado
