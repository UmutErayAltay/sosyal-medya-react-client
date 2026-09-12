import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CommentSection } from "../components/CommentSection";
import { PostCard } from "../components/PostCard";
import { ErrorState, LoadingState } from "../components/StateViews";
import { api } from "../lib/api";

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => api.postDetail(postId!),
    enabled: Boolean(postId),
  });

  if (isLoading) return <LoadingState label="gönderi yükleniyor…" />;
  if (isError) return <ErrorState error={error} onRetry={() => refetch()} />;
  if (!data) return null;

  return (
    <div className="mx-auto max-w-2xl border-l border-ink/10">
      <PostCard post={data.post} />
      <CommentSection postId={data.post.id} comments={data.comments} />
    </div>
  );
}
