import type { AuthResponse } from "@/lib/types";


const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

let accessToken: string | null = null;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

async function parseError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as { detail?: string | { msg: string }[] };
    if (typeof payload.detail === "string") return payload.detail;
    if (Array.isArray(payload.detail)) return payload.detail[0]?.msg ?? "Request failed";
  } catch {
    // Use the status fallback below when the response is not JSON.
  }
  return response.statusText || "Request failed";
}

async function refreshAccessToken(): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    setAccessToken(null);
    return false;
  }
  const session = (await response.json()) as AuthResponse;
  setAccessToken(session.access_token);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("jsp:session-refreshed", { detail: session }));
  }
  return true;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  retryOnUnauthorized = true,
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });
  if (response.status === 401 && retryOnUnauthorized && !path.startsWith("/auth/")) {
    if (await refreshAccessToken()) return apiRequest<T>(path, options, false);
  }
  if (!response.ok) throw new ApiError(await parseError(response), response.status);
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function createSession(
  endpoint: "login" | "signup",
  payload: unknown,
): Promise<AuthResponse> {
  const session = await apiRequest<AuthResponse>(
    `/auth/${endpoint}`,
    { method: "POST", body: JSON.stringify(payload) },
    false,
  );
  setAccessToken(session.access_token);
  return session;
}

export async function restoreSession(): Promise<AuthResponse | null> {
  const restored = await refreshAccessToken();
  if (!restored) return null;
  const user = await apiRequest<AuthResponse["user"]>("/users/me");
  return { access_token: accessToken ?? "", token_type: "bearer", user };
}

export async function destroySession(): Promise<void> {
  try {
    await apiRequest<void>("/auth/logout", { method: "POST" }, false);
  } finally {
    setAccessToken(null);
  }
}
