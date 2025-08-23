import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { fallbackBrands } from '@/lib/fallback-data'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = await prisma.brand.findUnique({ where: { slug } })
  const exists = brand || fallbackBrands.find((b) => b.slug === slug)
  if (exists) {
    redirect(`/catalog?brand=${encodeURIComponent(slug)}`)
  }
  return notFound()
}
