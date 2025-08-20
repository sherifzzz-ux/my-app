export default async function Page({ params }: { params: Promise<{ sub: string }> }) {
  const { sub } = await params
  const title = sub.replace(/-/g, ' ')
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <h1 className="text-2xl font-bold mb-2 capitalize">{title}</h1>
      <p className="text-muted-foreground">Contenu à venir.</p>
    </div>
  )
}
