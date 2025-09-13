import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { fallbackBrands } from '@/lib/fallback-data'
import { Grid } from '@/components/ui/responsive-grid'
import { TouchTarget } from '@/components/ui/touch-target'

export default async function Page() {
  // Utiliser les fallbackBrands pour avoir les images des marques
  const items = fallbackBrands
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Marques</h1>
      <Grid variant="brands" gap="md">
        {items.map((b) => (
          <TouchTarget key={b.id} size="default">
            <Link
              href={`/brand/${b.slug}`}
              className="flex items-center justify-center rounded-lg border p-4 bg-white hover:shadow-md transition-shadow h-full"
            >
              {b.imageUrl ? (
                <Image
                  src={b.imageUrl}
                  alt={b.name}
                  width={160}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-sm text-center">{b.name}</span>
              )}
            </Link>
          </TouchTarget>
        ))}
      </Grid>
    </div>
  )
}
