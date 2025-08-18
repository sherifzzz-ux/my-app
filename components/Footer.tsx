export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-semibold mb-3">Informations</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>Livraison</li>
            <li>Politique de cookies</li>
            <li>Conditions d’utilisations</li>
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
          <div className="text-muted-foreground">Visa, MasterCard, Mobile Money…</div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground py-4 border-t">
        <div className="mx-auto max-w-7xl px-4 md:px-6">© {new Date().getFullYear()} Mami Shop</div>
      </div>
    </footer>
  );
}


