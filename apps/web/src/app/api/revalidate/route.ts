import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const ALL_TAGS = [
  "articles",
  "team-members",
  "testimonials",
  "publications",
  "presentations",
  "news-items",
  "career-openings",
  "featured-logos",
  "page-contents",
  "site-configs",
];

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    for (const tag of ALL_TAGS) {
      revalidateTag(tag, "default");
    }
    return NextResponse.json({ success: true, revalidated: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Revalidation failed" },
      { status: 500 }
    );
  }
}
