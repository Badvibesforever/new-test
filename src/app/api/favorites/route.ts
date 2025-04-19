export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  const conn = await connectToDatabase();
  const db = conn.connection.db;
  const movies = await db.collection("favorites").find({}).toArray();
  return NextResponse.json(movies);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const conn = await connectToDatabase();
  const db = conn.connection.db;
  const exists = await db.collection("favorites").findOne({ id: body.id });
  if (exists) return NextResponse.json({ status: "exists" });
  await db.collection("favorites").insertOne(body);
  return NextResponse.json({ status: "ok" });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const conn = await connectToDatabase();
  const db = conn.connection.db;
  await db.collection("favorites").deleteOne({ id: body.id });
  return NextResponse.json({ status: "removed" });
}
