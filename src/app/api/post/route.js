import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allPosts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: allPosts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const reqBody = await request.json();

    let post;

    switch (reqBody.requestType) {
      case "findUnique":
        post = await prisma.post.findUnique({
          where: {
            id: reqBody.id,
          },
        });
        break;

      case "search":
        post = await prisma.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: reqBody.searchQuery,
                },
              },
              {
                description: {
                  contains: reqBody.searchQuery,
                },
              },
            ],
          },

          orderBy: { createdAt: "desc" },
        });
        break;

      default:
        post = await prisma.post.create({
          data: {
            ...reqBody,
          },
        });
        break;
    }

    return NextResponse.json({ data: post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const reqBody = await request.json();

    const updatedPost = await prisma.post.update({
      where: {
        id: reqBody.id,
      },
      data: {
        ...reqBody,
      },
    });

    return NextResponse.json({ data: updatedPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
