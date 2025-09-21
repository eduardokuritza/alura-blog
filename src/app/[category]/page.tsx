import Home from "@/modules/home/Home";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  return <Home {...{ category }} />;
}
