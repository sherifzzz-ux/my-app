import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = await prisma.brand.findUnique({ where: { slug } });
  if (brand) {
    redirect(`/catalog?brand=${encodeURIComponent(slug)}`);
  }
  return notFound();
}


