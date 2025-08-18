import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, User, ChevronDown } from "lucide-react";
import CartButton from "@/components/CartButton";

async function getTopCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { subcategories: true },
    take: 10,
  });
}

export default async function Header() {
  const categories = await getTopCategories();
  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger className="md:hidden p-2 -ml-2">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-3 mt-6">
                  {categories.map((c) => (
                    <Link key={c.id} href={`/#cat-${c.slug}`} className="text-sm hover:underline">
                      {c.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/next.svg" alt="Logo" width={100} height={22} className="dark:invert" />
              <span className="text-lg font-semibold">Mami Shop</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <button className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                Catégories <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute left-0 mt-2 w-[720px] rounded-lg border bg-background shadow p-4 grid grid-cols-3 gap-4 z-50">
                {categories.map((c) => (
                  <div key={c.id}>
                    <Link href={`/catalog?cat=${c.slug}`} className="font-medium text-sm hover:underline">
                      {c.name}
                    </Link>
                    {c.subcategories?.length ? (
                      <ul className="mt-2 space-y-1">
                        {c.subcategories.slice(0, 6).map((sc) => (
                          <li key={sc.id}>
                            <Link href={`/catalog?cat=${c.slug}&sub=${sc.slug}`} className="text-sm text-muted-foreground hover:text-foreground">
                              {sc.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground">Catégories</Link>
            <Link href="/brands" className="text-sm text-muted-foreground hover:text-foreground">Marques</Link>
            <Link href="/promo" className="text-sm text-muted-foreground hover:text-foreground">Promotions</Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:flex items-center gap-2">
              <form action="/catalog" className="relative">
                <Input name="q" placeholder="Rechercher..." className="w-64 pr-9" />
                <Search className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </form>
              <Button asChild variant="outline" className="hidden lg:inline-flex">
                <Link href="/catalog">Catalogue</Link>
              </Button>
            </div>
            <Link href="/account" className="p-2" aria-label="Compte">
              <User className="h-5 w-5" />
            </Link>
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}


