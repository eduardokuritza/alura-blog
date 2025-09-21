import { categories } from "@/mock/categories";

export async function generateStaticParams() {
  return categories.map((item: any) => ({ category: item.value }));
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
