import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = "muragegideon2000@gmail.com";

export async function GET() {
  try {
    console.log("Starting auth sync process...");
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser || !kindeUser.id || !kindeUser.email) {
      console.warn("No valid Kinde user found");
      return NextResponse.json(
        { error: "Not authenticated with Kinde" },
        { status: 401 }
      );
    }

    console.log(`Kinde user email: ${kindeUser.email}`);

    // Check if the email is the allowed admin email
    if (kindeUser.email !== ADMIN_EMAIL) {
      console.warn(`Access denied for email: ${kindeUser.email}`);
      return NextResponse.json(
        { error: "Access denied. Only authorized admin can access this system." },
        { status: 403 }
      );
    }

    console.log(`Upserting user in database for kindeId: ${kindeUser.id}`);
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

    console.log(`User synced successfully: ${user.id}`);
    return NextResponse.json({
      success: true,
      user,
      redirectUrl: "/admin",
    });
  } catch (error) {
    console.error("Auth sync error:", error instanceof Error ? error.message : String(error));
    console.error("Full error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
