import { useQuery } from "@tanstack/react-query";
import { PostCard } from "../components/PostCard";
import { PostComposer } from "../components/PostComposer";
import { ErrorState, LoadingState } from "../components/StateViews";
import { api } from "../lib/api";

export function FeedPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["feed"],
    queryFn: () => api.feed(),
  });

  return (
    <div className="mx-auto max-w-2xl border-l border-ink/10">
      <PostComposer />
      {isLoading && <LoadingState label="akış yükleniyor…" />}
      {isError && <ErrorState error={error} onRetry={() => refetch()} />}
      {data && data.posts.length === 0 && (
        <p className="px-4 py-10 text-center font-mono-chrome text-xs text-ink-soft">
          henüz kayıt yok — ilk paylaşımı sen yap.
        </p>
      )}
      {data?.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
