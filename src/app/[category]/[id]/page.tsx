import Single from "@/modules/single/Single";

type PageProps = {
  params: Promise<{ category: string; id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { category, id } = await params;
  return <Single {...{ category, id }} />;
}
