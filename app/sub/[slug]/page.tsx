import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sub = await prisma.subcategory.findUnique({ where: { slug } });
  if (sub) {
    redirect(`/catalog?sub=${encodeURIComponent(slug)}`);
  }
  return notFound();
}


