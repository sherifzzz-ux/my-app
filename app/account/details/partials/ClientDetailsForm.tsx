"use client";

import { useState } from "react";

export default function ClientDetailsForm({ initialName, email }: { initialName: string; email: string }) {
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur lors de la sauvegarde");
      setMessage("Modifications enregistrées");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inattendue";
      setMessage(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="text-sm space-y-3">
      <div>
        <div className="text-muted-foreground">Email</div>
        <div>{email}</div>
      </div>
      <div>
        <label htmlFor="name" className="text-muted-foreground block mb-1">Nom</label>
        <input id="name" className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <button className="rounded-md border px-4 py-2 text-sm" disabled={saving}>{saving ? "Enregistrement..." : "Enregistrer"}</button>
      {message ? <div className="text-xs text-muted-foreground">{message}</div> : null}
    </form>
  );
}


