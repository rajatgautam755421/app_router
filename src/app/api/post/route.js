import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const amount = parseInt(request.nextUrl.searchParams?.get("amount")) || 10;

    const allPosts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: amount,
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

export async function DELETE(request) {
  try {
    const reqBody = await request.json();

    const postExixts = await prisma.post.findUnique({
      where: { id: reqBody.id },
    });

    if (!postExixts) {
      throw new Error("Post With This Id Doesn't Exist.");
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: reqBody.id,
      },
    });

    return NextResponse.json({ data: deletedPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
