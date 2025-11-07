import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser || !kindeUser.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = {};
    if (category && category !== "all") {
      where.category = category;
    }
    if (featured === "true") {
      where.featured = true;
    }
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        images: true,
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error("Fetch events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
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
      category,
      featured,
      posterUrl,
    } = body;

    if (!title || !slug || !date) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug, date" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        shortDescription: shortDescription || "",
        fullDescription: fullDescription || "",
        date,
        location,
        ageRange,
        price: price ? parseFloat(price) : null,
        capacity: capacity ? parseInt(capacity) : null,
        category: category || "workshop",
        featured: featured || false,
        images: posterUrl
          ? {
              create: {
                url: posterUrl,
                alt: title,
                featured: true,
              },
            }
          : undefined,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(
      { success: true, data: event },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}


// export async function POST(request: NextRequest) {
//   try {
//     const { getUser } = getKindeServerSession();
//     const kindeUser = await getUser();

//     if (!kindeUser || !kindeUser.id) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();
//     const {
//       title,
//       slug,
//       shortDescription,
//       fullDescription,
//       date,
//       location,
//       ageRange,
//       price,
//       capacity,
//       category,
//       featured,
//       posterUrl,
//     } = body;

//     if (!title || !slug || !date) {
//       return NextResponse.json(
//         { error: "Missing required fields: title, slug, date" },
//         { status: 400 }
//       );
//     }

//     const event = await prisma.event.create({
//       data: {
//         title,
//         slug,
//         shortDescription: shortDescription || "",
//         fullDescription: fullDescription || "",
//         date,
//         location,
//         ageRange,
//         price: price ? parseFloat(price) : null,
//         capacity: capacity ? parseInt(capacity) : null,
//         category: category || "workshop",
//         featured: featured || false,
//         createdById: kindeUser.id,
//         images: posterUrl
//           ? {
//               create: {
//                 url: posterUrl,
//                 alt: title,
//                 featured: true,
//               },
//             }
//           : undefined,
//       },
//       include: {
//         images: true,
//       },
//     });

//     return NextResponse.json(
//       { success: true, data: event },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Create event error:", error);
//     return NextResponse.json(
//       { error: "Failed to create event" },
//       { status: 500 }
//     );
//   }
// }
