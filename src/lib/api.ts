import type {
  FeedResponse,
  FollowResponse,
  LikeResponse,
  LoginResponse,
  PostDetailResponse,
  ProfileResponse,
} from "../types/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string) {
    super(code);
    this.status = status;
    this.code = code;
  }
}

let authToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

/** Called once from AuthProvider so the request layer always has the current token. */
export function setAuthToken(token: string | null) {
  authToken = token;
}

/** Called once from AuthProvider so a 401 anywhere can force a logout/redirect. */
export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const hadToken = Boolean(authToken);
  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });

  // A 401 only means "your session died" when the request actually carried a
  // token. On an unauthenticated call (login/register) a 401 is the server
  // saying the credentials themselves were wrong — that must reach the
  // caller as a normal error body (e.g. invalid_credentials), not force a
  // logout for a session that never existed.
  if (res.status === 401 && hadToken) {
    onUnauthorized?.();
    throw new ApiError(401, "unauthorized");
  }

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // No JSON body (e.g. 429 from a proxy) — fall through with res.ok check below.
  }

  if (!res.ok) {
    const code =
      body && typeof body === "object" && "error" in body
        ? String((body as { error: unknown }).error)
        : `http_${res.status}`;
    throw new ApiError(res.status, code);
  }

  return body as T;
}

export const api = {
  register: (email: string, password: string, username: string) =>
    request<LoginResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
    }),

  login: (email: string, password: string) =>
    request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  feed: (cursor = 0, limit = 20) =>
    request<FeedResponse>(`/feed?cursor=${cursor}&limit=${limit}`),

  postDetail: (postId: string) =>
    request<PostDetailResponse>(`/posts/${postId}`),

  createPost: (content: string, visibility: "public" | "followers" = "public") => {
    const form = new FormData();
    form.set("content", content);
    form.set("visibility", visibility);
    return request<{ post: PostDetailResponse["post"] }>("/posts", {
      method: "POST",
      body: form,
    });
  },

  toggleLike: (postId: string) =>
    request<LikeResponse>(`/posts/${postId}/like`, { method: "POST" }),

  addComment: (postId: string, content: string) =>
    request<unknown>(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),

  profile: (username: string) =>
    request<ProfileResponse>(`/profile/${encodeURIComponent(username)}`),

  toggleFollow: (username: string) =>
    request<FollowResponse>(`/profile/${encodeURIComponent(username)}/follow`, {
      method: "POST",
    }),
};
