import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching Kinde user session...");
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser || !kindeUser.id) {
      console.warn("No Kinde user found in session");
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    console.log(`Fetching user from database with kindeId: ${kindeUser.id}`);
    const user = await prisma.user.findUnique({
      where: { kindeId: kindeUser.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kindeId: true,
      },
    });

    if (!user) {
      console.warn(`User not found in database for kindeId: ${kindeUser.id}`);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log(`User found: ${user.id} with role: ${user.role}`);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Auth user endpoint error:", error instanceof Error ? error.message : String(error));
    console.error("Full error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
