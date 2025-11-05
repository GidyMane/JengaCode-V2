import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = "muragegideon2000@gmail.com";
const SETUP_SECRET = process.env.ADMIN_SETUP_SECRET || "setup-secret-key";

export async function POST(request: Request) {
  try {
    // Get the secret from request header
    const authHeader = request.headers.get("authorization");
    const providedSecret = authHeader?.replace("Bearer ", "");

    if (providedSecret !== SETUP_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid setup secret." },
        { status: 401 }
      );
    }

    // Create or update the admin user
    // Note: This uses a placeholder kindeId since the user hasn't logged in through Kinde yet
    const user = await prisma.user.upsert({
      where: { email: ADMIN_EMAIL },
      update: {
        role: "admin",
        name: "Admin",
      },
      create: {
        email: ADMIN_EMAIL,
        name: "Admin",
        kindeId: `admin-setup-${Date.now()}`, // Temporary kindeId, will be updated when user logs in
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
      message: "Admin user setup complete. The user can now log in with their Kinde account.",
      user,
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Failed to set up admin user. Admin user already exists or database error." },
      { status: 500 }
    );
  }
}
