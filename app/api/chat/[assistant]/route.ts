const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

const allowedAssistants = new Set([
  "query",
  "job-discovery",
  "resume",
  "career",
  "recruiter",
  "support",
]);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ assistant: string }> },
) {
  const { assistant } = await params;
  if (!allowedAssistants.has(assistant)) {
    return Response.json({ detail: "Unknown assistant" }, { status: 404 });
  }

  const authorization = request.headers.get("authorization");
  const response = await fetch(`${API_BASE_URL}/chat/${assistant}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authorization ? { Authorization: authorization } : {}),
    },
    body: await request.text(),
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}
