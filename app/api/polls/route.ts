import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const polls = await db.poll.findMany({
      include: {
        options: {
          include: {
            _count: { select: { votes: true } }
          }
        },
        _count: { select: { votes: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(polls);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch polls" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { question, options, closingDate } = await req.json();

    if (!options || options.length < 2) {
      return NextResponse.json({ error: "At least 2 options are required" }, { status: 400 });
    }

    const poll = await db.poll.create({
      data: {
        question,
        creatorId: session.user.id,
        closingDate: closingDate ? new Date(closingDate) : null,
        options: {
          create: options.map((text: string) => ({ text }))
        }
      },
      include: {
        options: true
      }
    });

    return NextResponse.json(poll, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create poll" }, { status: 500 });
  }
}
