import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import type { Post } from "../types/api";
import { CommentStamp, LikeStamp } from "./icons";
import { TickingCount } from "./TickingCount";

function timeAgo(iso: string): string {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return "az önce";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}dk`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}sa`;
  return `${Math.floor(hours / 24)}g`;
}

export function PostCard({ post }: { post: Post }) {
  const queryClient = useQueryClient();
  const [optimistic, setOptimistic] = useState<{ liked: boolean; count: number } | null>(null);
  const liked = optimistic?.liked ?? post.liked_by_me;
  const count = optimistic?.count ?? post.like_count;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setOptimistic(null), [post.liked_by_me, post.like_count]);

  const likeMutation = useMutation({
    mutationFn: () => api.toggleLike(post.id),
    onError: () => setOptimistic(null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["post", post.id] });
    },
  });

  function handleLike() {
    setOptimistic({ liked: !liked, count: count + (liked ? -1 : 1) });
    likeMutation.mutate();
  }

  return (
    <article className="border-b border-ink/15 px-4 py-4">
      <div className="flex items-baseline gap-2">
        <img
          src={post.profiles.avatar_url ?? "https://api.dicebear.com/9.x/identicon/svg?seed=" + post.profiles.username}
          alt=""
          className="h-7 w-7 self-center rounded-full border border-ink/30 object-cover grayscale contrast-125"
        />
        <Link to={`/profile/${post.profiles.username}`} className="font-mono-chrome text-xs text-ink hover:underline">
          @{post.profiles.username}
        </Link>
        <span className="font-mono-chrome text-xs text-ink-soft">· {timeAgo(post.created_at)}</span>
      </div>

      <p className="mt-2 whitespace-pre-wrap leading-6 text-ink">{post.content}</p>

      {post.image_urls && post.image_urls.length > 0 && (
        <img src={post.image_urls[0]} alt="" className="mt-3 max-h-96 w-full border border-ink/15 object-cover" />
      )}

      <div className="mt-3 flex items-center gap-4 font-mono-chrome text-xs text-ink-soft">
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-1.5 border border-ink/20 px-2 py-1 hover:border-ink ${liked ? "border-accent text-accent" : ""}`}
        >
          <LikeStamp filled={liked} />
          <TickingCount value={count} accent />
        </button>
        <Link
          to={`/post/${post.id}`}
          className="flex items-center gap-1.5 border border-ink/20 px-2 py-1 hover:border-ink"
        >
          <CommentStamp />
          <TickingCount value={post.comment_count} />
        </Link>
      </div>
    </article>
  );
}
