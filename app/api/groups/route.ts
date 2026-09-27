import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const groups = await db.group.findMany({
      include: {
        _count: {
          select: { members: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, description, category, maxMembers, visibility } = await req.json();

    const group = await db.group.create({
      data: {
        name,
        description,
        category,
        maxMembers: parseInt(maxMembers) || null,
        visibility: visibility || "PUBLIC",
        creatorId: session.user.id
      }
    });

    await db.groupMember.create({
      data: {
        userId: session.user.id,
        groupId: group.id
      }
    });

    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create group" }, { status: 500 });
  }
}
