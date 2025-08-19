"use client";

import { Home, Grid3X3, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function MobileFooterNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[9999] shadow-lg">
      <div className="flex items-center justify-around py-2">
        <Link
          href="/"
          className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-[#F792CC]"
        >
          <Home className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">ACCUEIL</span>
        </Link>

        <Link
          href="/marques"
          className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-[#F792CC]"
        >
          <Grid3X3 className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">MARQUES</span>
        </Link>

        <Link
          href="/panier"
          className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-[#F792CC]"
        >
          <ShoppingCart className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">PANIER</span>
        </Link>

        <Link
          href="/compte"
          className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-[#F792CC]"
        >
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">COMPTE</span>
        </Link>
      </div>
    </div>
  );
}

export { MobileFooterNav };


