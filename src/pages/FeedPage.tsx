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
    <div className="mx-auto max-w-xl px-4 py-6">
      <PostComposer />
      {isLoading && <LoadingState label="akış yükleniyor…" />}
      {isError && <ErrorState error={error} onRetry={() => refetch()} />}
      {data && data.posts.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-text-soft">
          henüz kayıt yok — ilk paylaşımı sen yap.
        </p>
      )}
      {data?.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
