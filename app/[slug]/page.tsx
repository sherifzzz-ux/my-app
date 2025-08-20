import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Tente de résoudre en catégorie
  const category = await prisma.category.findUnique({ where: { slug } })
  if (category) {
    redirect(`/catalog?cat=${encodeURIComponent(slug)}`)
  }
  return notFound()
}
