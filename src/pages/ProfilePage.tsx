import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { ErrorState, LoadingState } from "../components/StateViews";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import type { ProfileResponse } from "../types/api";

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { user: me } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => api.profile(username!),
    enabled: Boolean(username),
  });

  const followMutation = useMutation({
    mutationFn: () => api.toggleFollow(username!),
    onSuccess: (res) => {
      queryClient.setQueryData<ProfileResponse>(["profile", username], (old) =>
        old
          ? { ...old, is_following: res.following, is_pending_request: res.is_pending, followers_count: res.followers_count }
          : old,
      );
    },
  });

  if (isLoading) return <LoadingState label="profil yükleniyor…" />;
  if (isError) return <ErrorState error={error} onRetry={() => refetch()} />;
  if (!data) return null;

  const isSelf = data.is_self || me?.username === username;

  return (
    <div className="mx-auto max-w-2xl border-l border-ink/10">
      <div className="border-b border-ink/15 px-4 py-6">
        <div className="flex items-center gap-4">
          <img
            src={
              data.profile.avatar_url ??
              "https://api.dicebear.com/9.x/identicon/svg?seed=" + data.profile.username
            }
            alt=""
            className="h-14 w-14 rounded-full border border-ink/30 object-cover grayscale contrast-125"
          />
          <div className="flex-1">
            <h1 className="font-mono-chrome text-sm text-ink">@{data.profile.username}</h1>
            {data.profile.bio && <p className="mt-1 text-sm text-ink-soft">{data.profile.bio}</p>}
          </div>
          {!isSelf && (
            <button
              type="button"
              onClick={() => followMutation.mutate()}
              disabled={followMutation.isPending}
              className="border border-ink px-4 py-1.5 text-sm font-medium text-ink hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/25 disabled:text-ink-soft disabled:hover:bg-transparent"
            >
              {data.is_pending_request ? "istek gönderildi" : data.is_following ? "takibi bırak" : "takip et"}
            </button>
          )}
        </div>
        <div className="mt-4 flex gap-6 font-mono-chrome text-xs text-ink-soft">
          <span>
            <strong className="text-ink">{data.posts.length}</strong> gönderi
          </span>
          <span>
            <strong className="text-ink">{data.followers_count}</strong> takipçi
          </span>
          <span>
            <strong className="text-ink">{data.following_count}</strong> takip
          </span>
        </div>
      </div>

      {data.posts.length === 0 ? (
        <p className="px-4 py-10 text-center font-mono-chrome text-xs text-ink-soft">henüz kayıt yok.</p>
      ) : (
        data.posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
