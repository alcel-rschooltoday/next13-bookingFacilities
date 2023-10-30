import { NextRequest, NextResponse } from "next/server";

import { db } from "@vercel/postgres";

export default async function handler(request: NextRequest) {
  const client = await db.connect();
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS booking ( 
        id INTEGER NOT NULL AUTO_INCREMENT, 
        name VARCHAR(191) NOT NULL, date DATETIME(3) NOT NULL, 
        time VARCHAR(255) NOT NULL, facility VARCHAR(191) NOT NULL, 
        status ENUM('NEW', 'APPROVED', 'CANCELLED', 'DELETED') NOT NULL DEFAULT 'NEW', 
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL );`;
    return NextResponse.json("access", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

/*
export async function POST(request: NextRequest) {
  const body = await request.json();

  const newBooking = await prisma.booking.create({
    data: {
      name: body.name,
      date: new Date(body.date),
      time: body.time,
      facility: body.facility,
    },
  });

  return NextResponse.json(newBooking, { status: 201 });
}

export async function GET(request: NextRequest) {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}*/
