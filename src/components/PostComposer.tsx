import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../lib/api";
import { describeApiError } from "./StateViews";

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
      className="border-b border-ink/15 px-4 pb-4 pt-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (content.trim()) mutation.mutate();
      }}
    >
      <div className="mb-1 font-mono-chrome text-[11px] uppercase tracking-wide text-ink-soft">
        yeni kayıt
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Neler oluyor?"
        rows={3}
        maxLength={2000}
        className="ruled w-full resize-none border-0 p-0 leading-7 text-ink placeholder:text-ink-soft/60 focus:outline-none"
      />
      <div className="mt-2 flex items-center justify-between border-t border-ink/10 pt-2">
        {mutation.isError ? (
          <span className="font-mono-chrome text-xs text-accent">{describeApiError(mutation.error)}</span>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={!content.trim() || mutation.isPending}
          className="border border-ink px-3 py-1 text-sm font-medium text-ink hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/25 disabled:text-ink-soft disabled:hover:bg-transparent"
        >
          {mutation.isPending ? "paylaşılıyor…" : "paylaş"}
        </button>
      </div>
    </form>
  );
}
