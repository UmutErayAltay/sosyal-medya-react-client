import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { ErrorState, LoadingState } from "../components/StateViews";
import { TickingCount } from "../components/TickingCount";
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
          ? {
              ...old,
              is_following: res.following,
              is_pending_request: res.is_pending,
              stats: { ...old.stats, followers: res.followers_count },
            }
          : old,
      );
    },
  });

  if (isLoading) return <LoadingState label="profil yükleniyor…" />;
  if (isError) return <ErrorState error={error} onRetry={() => refetch()} />;
  if (!data) return null;

  const isSelf = data.is_self || me?.username === username;

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <div className="shadow-card mb-4 rounded-3xl border border-border bg-surface p-6">
        <div className="flex items-center gap-4">
          <img
            src={
              data.profile.avatar_url ??
              "https://api.dicebear.com/9.x/identicon/svg?seed=" + data.profile.username
            }
            alt=""
            className="h-16 w-16 rounded-full object-cover ring-4 ring-bg"
          />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-lg font-semibold text-text">@{data.profile.username}</h1>
            {data.profile.bio && <p className="mt-0.5 text-sm text-text-soft">{data.profile.bio}</p>}
          </div>
          {!isSelf && (
            <button
              type="button"
              onClick={() => followMutation.mutate()}
              disabled={followMutation.isPending}
              className="shadow-glow inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-accent-strong to-accent-2 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:from-surface-2 disabled:to-surface-2 disabled:text-text-soft disabled:shadow-none"
            >
              {data.is_pending_request ? "istek gönderildi" : data.is_following ? "takibi bırak" : "takip et"}
            </button>
          )}
        </div>
        <div className="mt-5 flex gap-6 text-sm text-text-soft">
          <span>
            <strong className="font-semibold text-text">
              <TickingCount value={data.stats.posts} />
            </strong>{" "}
            gönderi
          </span>
          <span>
            <strong className="font-semibold text-text">
              <TickingCount value={data.stats.followers} />
            </strong>{" "}
            takipçi
          </span>
          <span>
            <strong className="font-semibold text-text">
              <TickingCount value={data.stats.following} />
            </strong>{" "}
            takip
          </span>
        </div>
      </div>

      {data.posts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-text-soft">
          henüz kayıt yok.
        </p>
      ) : (
        data.posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
