import { http, HttpResponse } from "msw";

const BASE = "http://localhost:5000/api/v1";

export const samplePost = {
  id: "post-1",
  user_id: "user-1",
  content: "Merhaba dünya",
  image_urls: [],
  created_at: new Date().toISOString(),
  profiles: { username: "umut", avatar_url: null },
  like_count: 2,
  comment_count: 1,
  liked_by_me: false,
  my_reaction: null,
};

export const handlers = [
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.password === "wrong") {
      return HttpResponse.json({ error: "invalid_credentials" }, { status: 401 });
    }
    return HttpResponse.json({
      token: "test-token",
      user: { id: "user-1", email: body.email, username: "umut", avatar_url: null, is_admin: false },
    });
  }),

  http.get(`${BASE}/feed`, () =>
    HttpResponse.json({
      posts: [samplePost],
      has_next: false,
      next_cursor: null,
      suggested_users: [],
    }),
  ),

  http.post(`${BASE}/posts/:postId/like`, () =>
    HttpResponse.json({ liked: true, reaction: "like", count: 3 }),
  ),
];
