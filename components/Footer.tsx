export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-semibold mb-3">Informations</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/livraison" className="hover:underline">Livraison</a></li>
            <li><a href="/conditions" className="hover:underline">Conditions d’utilisations</a></li>
            <li><a href="#" className="hover:underline">Politique de cookies</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Catégories</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>Cheveux</li>
            <li>Corps & Bain</li>
            <li>Maquillage</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Contact</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>contact@example.com</li>
            <li>+221 00 000 00 00</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Paiement sécurisé</div>
          <div className="text-muted-foreground">Orange Money, Wave, Visa, MasterCard…</div>
          <div className="mt-3 text-muted-foreground text-xs">Site par <a className="underline" href="https://example-agency.com" target="_blank" rel="noopener noreferrer">Votre Agence</a></div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground py-4 border-t">
        <div className="mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Mami Shop</span>
          <a href="#top" className="underline">Retour en haut</a>
        </div>
      </div>
    </footer>
  );
}


