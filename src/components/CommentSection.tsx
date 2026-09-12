import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import type { Comment } from "../types/api";
import { InlineError, describeApiError } from "./StateViews";

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="border-t border-border py-3 first:border-t-0">
      <Link to={`/profile/${comment.profiles.username}`} className="text-sm font-medium text-text hover:text-accent">
        @{comment.profiles.username}
      </Link>
      <p className="mt-1 text-sm text-text">{comment.content}</p>
      {comment.replies.length > 0 && (
        <div className="ml-4 mt-2 border-l border-border pl-4">
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
    <div className="shadow-card mt-4 rounded-2xl border border-border bg-surface p-4">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (content.trim()) mutation.mutate();
        }}
      >
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="yorum yaz…"
          className="min-h-11 flex-1 rounded-full border border-border bg-bg/50 px-4 text-sm text-text placeholder:text-text-soft focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={!content.trim() || mutation.isPending}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-linear-to-r from-accent-strong to-accent-2 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:from-surface-2 disabled:to-surface-2 disabled:text-text-soft"
        >
          gönder
        </button>
      </form>
      {mutation.isError && (
        <div className="pt-2">
          <InlineError>{describeApiError(mutation.error)}</InlineError>
        </div>
      )}
      {comments.length > 0 && <div className="mt-2">{comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}</div>}
    </div>
  );
}
