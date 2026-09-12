import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../lib/api";
import { InlineError, describeApiError } from "./StateViews";

export function PostComposer() {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => api.createPost(content.trim(), "public"),
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  return (
    <form
      className="shadow-card mb-4 rounded-2xl border border-border bg-surface p-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (content.trim()) mutation.mutate();
      }}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Neler oluyor?"
        rows={3}
        maxLength={2000}
        className="w-full resize-none rounded-xl border border-transparent bg-bg/50 p-3 text-[15px] text-text placeholder:text-text-soft focus:border-accent focus:outline-none"
      />
      <div className="mt-3 flex items-center justify-between">
        {mutation.isError ? <InlineError>{describeApiError(mutation.error)}</InlineError> : <span />}
        <button
          type="submit"
          disabled={!content.trim() || mutation.isPending}
          className="shadow-glow inline-flex min-h-11 items-center justify-center rounded-full bg-linear-to-r from-accent-strong to-accent-2 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:from-surface-2 disabled:to-surface-2 disabled:text-text-soft disabled:shadow-none"
        >
          {mutation.isPending ? "paylaşılıyor…" : "paylaş"}
        </button>
      </div>
    </form>
  );
}
