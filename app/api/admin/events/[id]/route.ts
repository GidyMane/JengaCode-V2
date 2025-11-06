import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser || !kindeUser.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        images: true,
        attendees: true,
        activities: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error("Fetch event error:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser || !kindeUser.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      shortDescription,
      fullDescription,
      date,
      location,
      ageRange,
      price,
      capacity,
      registered,
      category,
      featured,
      posterUrl,
    } = body;

    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(shortDescription && { shortDescription }),
        ...(fullDescription && { fullDescription }),
        ...(date && { date }),
        ...(location && { location }),
        ...(ageRange !== undefined && { ageRange }),
        ...(price !== undefined && { price: price ? parseFloat(price) : null }),
        ...(capacity !== undefined && { capacity: capacity ? parseInt(capacity) : null }),
        ...(registered !== undefined && { registered: parseInt(registered) }),
        ...(category && { category }),
        ...(featured !== undefined && { featured }),
        updatedAt: new Date(),
      },
      include: {
        images: true,
      },
    });

    if (posterUrl) {
      await prisma.eventImage.deleteMany({
        where: { eventId: params.id, featured: true },
      });
      await prisma.eventImage.create({
        data: {
          url: posterUrl,
          alt: title || event.title,
          featured: true,
          eventId: params.id,
        },
      });
    }

    const updatedEvent = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        images: true,
      },
    });

    return NextResponse.json(
      { success: true, data: updatedEvent }
    );
  } catch (error) {
    console.error("Update event error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser || !kindeUser.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.eventImage.deleteMany({
      where: { eventId: params.id },
    });

    await prisma.event.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { success: true, message: "Event deleted successfully" }
    );
  } catch (error) {
    console.error("Delete event error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
