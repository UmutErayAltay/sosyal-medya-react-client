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
    <article className="shadow-card mb-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong">
      <div className="flex items-center gap-3">
        <img
          src={post.profiles.avatar_url ?? "https://api.dicebear.com/9.x/identicon/svg?seed=" + post.profiles.username}
          alt=""
          className="h-10 w-10 rounded-full object-cover ring-2 ring-border-strong"
        />
        <div className="flex min-w-0 flex-col leading-tight">
          <Link to={`/profile/${post.profiles.username}`} className="truncate text-sm font-medium text-text hover:text-accent">
            @{post.profiles.username}
          </Link>
          <span className="font-mono text-xs text-text-soft">{timeAgo(post.created_at)}</span>
        </div>
      </div>

      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-text">{post.content}</p>

      {post.image_urls && post.image_urls.length > 0 && (
        <img
          src={post.image_urls[0]}
          alt=""
          className="mt-3 max-h-[480px] w-full rounded-xl border border-border object-cover"
        />
      )}

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleLike}
          className={
            liked
              ? "shadow-glow flex min-h-11 items-center gap-1.5 rounded-full bg-linear-to-r from-accent-strong to-accent-2 px-3 text-sm font-medium text-white"
              : "flex min-h-11 items-center gap-1.5 rounded-full border border-border px-3 text-sm text-text-soft transition-colors hover:border-accent hover:text-accent"
          }
        >
          <LikeStamp filled={liked} />
          <TickingCount value={count} />
        </button>
        <Link
          to={`/post/${post.id}`}
          className="flex min-h-11 items-center gap-1.5 rounded-full border border-border px-3 text-sm text-text-soft transition-colors hover:border-accent hover:text-accent"
        >
          <CommentStamp />
          <TickingCount value={post.comment_count} />
        </Link>
      </div>
    </article>
  );
}
