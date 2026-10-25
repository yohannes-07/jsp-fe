const BACKEND_API_BASE_URL = (
  process.env.API_BASE_URL ?? "http://localhost:8000/api/v1"
).replace(/\/$/, "");

function backendUrl(request: Request, path: string[]): string {
  const incomingUrl = new URL(request.url);
  const encodedPath = path.map(encodeURIComponent).join("/");
  return `${BACKEND_API_BASE_URL}/${encodedPath}${incomingUrl.search}`;
}

async function proxyRequest(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const { path } = await params;
  const headers = new Headers(request.headers);

  // These describe the browser-to-Vercel connection and must be recalculated
  // by fetch for the Vercel-to-Render connection.
  headers.delete("host");
  headers.delete("content-length");
  headers.delete("connection");
  headers.delete("accept-encoding");

  const method = request.method.toUpperCase();
  const hasBody = method !== "GET" && method !== "HEAD";

  try {
    const backendResponse = await fetch(backendUrl(request, path), {
      method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: "no-store",
      redirect: "manual",
    });
    const responseHeaders = new Headers(backendResponse.headers);
    // fetch may decompress the upstream body. Let the browser calculate the
    // representation length and encoding for the proxied response.
    responseHeaders.delete("content-length");
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("connection");

    return new Response(
      backendResponse.status === 204 ? null : backendResponse.body,
      {
        status: backendResponse.status,
        headers: responseHeaders,
      },
    );
  } catch {
    return Response.json(
      { detail: "The CirWork service is temporarily unavailable" },
      { status: 502 },
    );
  }
}

export const dynamic = "force-dynamic";

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
