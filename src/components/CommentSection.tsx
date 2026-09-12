import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import type { Comment } from "../types/api";
import { describeApiError } from "./StateViews";

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="border-t border-ink/10 py-3">
      <Link
        to={`/profile/${comment.profiles.username}`}
        className="font-mono-chrome text-xs text-ink hover:underline"
      >
        @{comment.profiles.username}
      </Link>
      <p className="mt-1 text-sm text-ink">{comment.content}</p>
      {comment.replies.length > 0 && (
        <div className="ml-4 mt-2 border-l border-ink/10 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentSection({ postId, comments }: { postId: string; comments: Comment[] }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => api.addComment(postId, content.trim()),
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  return (
    <div className="px-4">
      <form
        className="flex gap-2 border-t border-ink/15 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (content.trim()) mutation.mutate();
        }}
      >
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="yorum yaz…"
          className="flex-1 border-0 border-b border-ink/25 bg-transparent px-0 py-1.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={!content.trim() || mutation.isPending}
          className="border border-ink px-3 py-1.5 text-sm font-medium text-ink hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/25 disabled:text-ink-soft disabled:hover:bg-transparent"
        >
          gönder
        </button>
      </form>
      {mutation.isError && (
        <p className="pb-2 font-mono-chrome text-xs text-accent">{describeApiError(mutation.error)}</p>
      )}
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
