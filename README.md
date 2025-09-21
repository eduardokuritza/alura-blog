# Alura Blog — Case Técnico (Frontend | Next.js)

Aplicação desenvolvida como parte do case técnico da Alura. O objetivo foi criar uma listagem de postagens com página de detalhes, seguindo fielmente o design no [Figma](https://www.figma.com/design/MOdixi2zYNtxwNyok05D6W/Desafio-NextJS), consumindo uma API fake e aplicando boas práticas de **SEO**, **acessibilidade**, **performance** e **componentização**.

> 🚀 **Deploy na Vercel:** [https://alura-blog.vercel.app/](https://alura-blog.vercel.app/)
> 📊 **PageSpeed Insights:** Veja como o Google avaliou a aplicação → [**Relatório completo aqui**](https://pagespeed.web.dev/analysis/https-alura-blog-vercel-app/glhkr8rcdh?form_factor=desktop)

## ▶️ Como rodar localmente

**Pré-requisitos:** Node.js 18+ e gerenciador de pacotes (pnpm, yarn ou npm).

1. Instale as dependências:

   ```bash
   yarn
   ```

2. Inicie o servidor em modo desenvolvimento:

   ```bash
   yarn dev
   ```

3. Acesse no navegador: [http://localhost:3000](http://localhost:3000)

### Build de produção

```bash
yarn build && yarn start
```

## ✅ Stack e Principais Decisões

- **Next.js 15** (App Router) + Turbopack  
- **TypeScript** com tipagem segura (`src/@types`)  
- **Tailwind CSS v4** (configuração em `tailwind.config.ts` e tokens via CSS vars)  
- **React Query (TanStack)** para cache, revalidação e gerenciamento de estado de requisições  
- **next-themes** para modo claro/escuro (detecção do sistema + toggle manual)  
- **Sass** para utilidades globais e theming complementar

## 🎯 Requisitos do Case — Como foram atendidos

- **Next.js 15 com App Router**: ✅ Estrutura em `src/app`  
- **TypeScript com tipagem segura**: ✅ (`src/@types/posts.d.ts` e uso estrito)  
- **Tailwind 4 para estilização**: ✅ (v4.1.x)  
- **Consumir API fake**: ✅ (axios + baseURL, endpoints mapeados)  
- **SEO**: ✅ metadata, lang, viewport, ícones e fonte otimizada  
- **Acessibilidade**: ✅ navegação com aria-label, foco visível, botões semânticos, imagens com alt  
- **Fidelidade ao Figma**: ✅ layout implementado e responsivo  
- **Responsividade total**: ✅ grid e utilitários responsivos  
- **Performance**: ✅ Turbopack, cache do React Query, componentes leves  
- **Diferencial**: ✅ tema claro/escuro implementado
