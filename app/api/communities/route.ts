import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const communities = await db.community.findMany({
      include: {
        _count: {
          select: { members: true, posts: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(communities);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch communities" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, description, category } = await req.json();

    const community = await db.community.create({
      data: {
        name,
        description,
        category,
      }
    });

    // Automatically add creator as a member
    await db.communityMember.create({
      data: {
        userId: session.user.id,
        communityId: community.id
      }
    });

    return NextResponse.json(community, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create community" }, { status: 500 });
  }
}
