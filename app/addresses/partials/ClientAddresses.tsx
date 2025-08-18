"use client";

import { useEffect, useState } from "react";

type Address = {
  id: string;
  name: string;
  phone: string;
  city: string;
  addressLine1: string;
  addressLine2?: string | null;
  isDefault: boolean;
};

export default function ClientAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Address>>({ isDefault: false });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    const res = await fetch("/api/account/addresses", { cache: "no-store" });
    const data = await res.json();
    setAddresses(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function saveAddress(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/account/addresses", {
        method: form?.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur lors de l'enregistrement");
      setForm({ isDefault: false });
      await refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inattendue";
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteAddress(id: string) {
    const res = await fetch(`/api/account/addresses?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) refresh();
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h2 className="font-medium mb-3">Mes adresses</h2>
        {loading ? (
          <div className="text-sm text-muted-foreground">Chargement…</div>
        ) : addresses.length === 0 ? (
          <div className="text-sm text-muted-foreground">Aucune adresse enregistrée.</div>
        ) : (
          <ul className="space-y-3">
            {addresses.map((a) => (
              <li key={a.id} className="rounded-md border p-3 text-sm">
                <div className="font-medium flex items-center gap-2">
                  {a.name}
                  {a.isDefault ? <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 border">Par défaut</span> : null}
                </div>
                <div className="text-muted-foreground">{a.phone}</div>
                <div>{a.addressLine1}{a.addressLine2 ? `, ${a.addressLine2}` : ""}</div>
                <div>{a.city}</div>
                <div className="mt-2 flex gap-2">
                  <button className="rounded-md border px-3 py-1" onClick={() => setForm({ ...a })}>Éditer</button>
                  <button className="rounded-md border px-3 py-1" onClick={() => deleteAddress(a.id)}>Supprimer</button>
                  {!a.isDefault ? (
                    <button className="rounded-md border px-3 py-1" onClick={() => setForm({ ...a, isDefault: true })}>Définir par défaut</button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2 className="font-medium mb-3">Ajouter / Modifier</h2>
        <form onSubmit={saveAddress} className="space-y-3 text-sm">
          <input className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full" placeholder="Nom complet" value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full" placeholder="Téléphone" value={form.phone ?? ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full" placeholder="Ville" value={form.city ?? ""} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <input className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full" placeholder="Adresse (ligne 1)" value={form.addressLine1 ?? ""} onChange={(e) => setForm({ ...form, addressLine1: e.target.value })} />
          <input className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full" placeholder="Adresse (ligne 2)" value={form.addressLine2 ?? ""} onChange={(e) => setForm({ ...form, addressLine2: e.target.value })} />
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={!!form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} />
            Définir comme adresse par défaut
          </label>
          <div className="flex gap-2">
            <button type="submit" className="rounded-md border px-4 py-2" disabled={saving}>{saving ? "Enregistrement..." : (form?.id ? "Mettre à jour" : "Ajouter")}</button>
            {form?.id ? (
              <button type="button" className="rounded-md border px-4 py-2" onClick={() => setForm({ isDefault: false })}>Annuler</button>
            ) : null}
          </div>
          {error ? <div className="text-xs text-red-600">{error}</div> : null}
        </form>
      </div>
    </div>
  );
}


