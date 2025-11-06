import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = "muragegideon2000@gmail.com";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser || !kindeUser.id || !kindeUser.email) {
      return NextResponse.json(
        { error: "Not authenticated with Kinde" },
        { status: 401 }
      );
    }

    // Check if the email is the allowed admin email
    if (kindeUser.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Access denied. Only authorized admin can access this system." },
        { status: 403 }
      );
    }

    // Upsert the user in the database
    const user = await prisma.user.upsert({
      where: { kindeId: kindeUser.id },
      update: {
        email: kindeUser.email,
        name: kindeUser.given_name || kindeUser.family_name || "Admin",
        role: "admin",
      },
      create: {
        email: kindeUser.email,
        name: kindeUser.given_name || kindeUser.family_name || "Admin",
        kindeId: kindeUser.id,
        role: "admin",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kindeId: true,
      },
    });

    return NextResponse.json({
      success: true,
      user,
      redirectUrl: "/admin",
    });
  } catch (error) {
    console.error("Auth sync error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
