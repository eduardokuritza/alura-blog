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

// Server-side search helpers (keep it simple and fast for 45 posts total)
export function shouldServerFilter(search?: string | null) {
  return !!(search && search.trim().length >= 3);
}

export async function fetchAllPostsAndFilter(endpoint: string, search: string, pageNum: number, limitNum: number) {
  // Always gather with limit=9 as per API cap to minimize requests
  const first = new URL(endpoint);
  first.searchParams.set("page", "1");
  first.searchParams.set("limit", "9");

  const firstRes = await fetch(first.toString());
  if (!firstRes.ok) throw new Error(`Upstream status ${firstRes.status}`);
  const firstData = await firstRes.json();

  const totalPages: number = firstData?.pagination?.totalPages ?? 1;
  let posts: any[] = Array.isArray(firstData?.posts) ? firstData.posts : [];

  if (totalPages > 1) {
    const tasks: Promise<any[]>[] = [];
    for (let p = 2; p <= totalPages; p++) {
      const u = new URL(endpoint);
      u.searchParams.set("page", String(p));
      u.searchParams.set("limit", "9");
      tasks.push(
        fetch(u.toString())
          .then((r) => r.json())
          .then((d) => (Array.isArray(d?.posts) ? d.posts : []))
      );
    }
    const batches = await Promise.all(tasks);
    for (const batch of batches) posts = posts.concat(batch);
  }

  const term = search.toLowerCase();
  const filtered = posts.filter((p) =>
    String(p?.title || "")
      .toLowerCase()
      .includes(term)
  );

  const totalPosts = filtered.length;
  const totalPagesFiltered = Math.max(1, Math.ceil(totalPosts / limitNum));
  const currentPage = Math.min(Math.max(1, pageNum), totalPagesFiltered);
  const start = (currentPage - 1) * limitNum;
  const pagePosts = filtered.slice(start, start + limitNum);

  const meta = firstData?.meta ?? {};
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
      ...meta,
      seed: `search-${term}-page-${currentPage}-limit-${limitNum}`
    }
  };
}
