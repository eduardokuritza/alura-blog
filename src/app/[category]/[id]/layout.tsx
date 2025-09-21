import { getAllPostParams } from "@/lib/handleParams";

type LayoutProps = { children: React.ReactNode };

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  return getAllPostParams();
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
