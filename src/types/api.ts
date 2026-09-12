// Shapes mirror the live backend contract in sosyal-medya/app/api_v1/.
// Fields the v1 client doesn't render (polls, reels, stickers, ...) are kept
// as unknown/optional rather than omitted, so passing through extra JSON
// from the API never breaks type-checking.

export interface AuthUser {
  id: string;
  email?: string;
  username: string;
  avatar_url: string | null;
  is_admin?: boolean;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface PostAuthor {
  username: string;
  avatar_url: string | null;
  is_private?: boolean;
  is_deactivated?: boolean;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_urls?: string[];
  image_url?: string | null;
  video_url?: string | null;
  is_reel?: boolean;
  is_draft?: boolean;
  visibility?: "public" | "followers" | "close_friends";
  created_at: string;
  profiles: PostAuthor;
  like_count: number;
  comment_count: number;
  liked_by_me: boolean;
  my_reaction: string | null;
  bookmarked_by_me?: boolean;
  repost_of?: Post | null;
  poll?: unknown;
}

export interface FeedResponse {
  posts: Post[];
  has_next: boolean;
  next_cursor: number | null;
  suggested_users: Array<{
    id: string;
    username: string;
    avatar_url: string | null;
    full_name: string | null;
  }>;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  parent_comment_id?: string | null;
  created_at: string;
  profiles: PostAuthor;
  like_count: number;
  liked_by_me: boolean;
  replies: Comment[];
  sticker?: { id: string; image_url: string } | null;
  reactions?: Array<{ reaction: string; count: number; mine: boolean }>;
}

export interface PostDetailResponse {
  post: Post;
  comments: Comment[];
}

export interface LikeResponse {
  liked: boolean;
  reaction: string | null;
  count: number;
}

export interface ProfileData {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  is_private: boolean;
  is_deactivated: boolean;
  pinned_post_id: string | null;
  email?: string;
  is_admin?: boolean;
}

export interface ProfileResponse {
  profile: ProfileData;
  posts: Post[];
  liked_posts?: Post[];
  bookmarked_posts?: Post[];
  archived_posts?: Post[];
  is_following: boolean;
  is_pending_request: boolean;
  is_private: boolean;
  is_blocked_by_me: boolean;
  is_self: boolean;
  deactivated?: boolean;
  stats: {
    posts: number;
    followers: number;
    following: number;
    likes: number;
  };
}

export interface FollowResponse {
  following: boolean;
  followers_count: number;
  is_pending: boolean;
}

export interface ApiErrorBody {
  error: string;
}
