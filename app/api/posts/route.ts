import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const communityId = searchParams.get("communityId");
    
    const posts = await db.post.findMany({
      where: communityId ? { communityId } : {},
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            anonymousName: true
          }
        },
        _count: {
          select: { comments: true, reactions: true }
        }
      }
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, isConfession, communityId } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const newPost = await db.post.create({
      data: {
        content,
        isConfession: isConfession || false,
        authorId: session.user.id,
        communityId: communityId || null
      },
      include: {
        author: {
          select: { anonymousName: true }
        }
      }
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
