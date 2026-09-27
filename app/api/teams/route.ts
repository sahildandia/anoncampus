import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const teams = await db.teamListing.findMany({
      include: {
        creator: { select: { anonymousName: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team listings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, description, skillsRequired, currentSize, maxSize } = await req.json();

    const listing = await db.teamListing.create({
      data: {
        title,
        description,
        skillsRequired,
        currentSize: parseInt(currentSize) || 1,
        maxSize: parseInt(maxSize) || 4,
        creatorId: session.user.id
      }
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team listing" }, { status: 500 });
  }
}
