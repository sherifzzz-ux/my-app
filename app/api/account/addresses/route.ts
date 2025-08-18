import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json([], { status: 200 });
  const addresses = await prisma.address.findMany({ where: { userId: session.user.id }, orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }] });
  return NextResponse.json(addresses);
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    const body = await req.json();
    const { name, phone, city, addressLine1, addressLine2, isDefault } = body ?? {};
    if (!name || !phone || !city || !addressLine1) return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    if (isDefault) {
      await prisma.address.updateMany({ where: { userId: session.user.id, isDefault: true }, data: { isDefault: false } });
    }
    const created = await prisma.address.create({
      data: { userId: session.user.id, name, phone, city, addressLine1, addressLine2: addressLine2 || null, isDefault: !!isDefault },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    console.error("address create error", err);
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    const body = await req.json();
    const { id, name, phone, city, addressLine1, addressLine2, isDefault } = body ?? {};
    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    if (isDefault) {
      await prisma.address.updateMany({ where: { userId: session.user.id, isDefault: true }, data: { isDefault: false } });
    }
    const updated = await prisma.address.update({
      where: { id },
      data: {
        name: name ?? undefined,
        phone: phone ?? undefined,
        city: city ?? undefined,
        addressLine1: addressLine1 ?? undefined,
        addressLine2: addressLine2 ?? undefined,
        isDefault: typeof isDefault === "boolean" ? isDefault : undefined,
      },
    });
    return NextResponse.json(updated);
  } catch (err: unknown) {
    console.error("address update error", err);
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    await prisma.address.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("address delete error", err);
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


