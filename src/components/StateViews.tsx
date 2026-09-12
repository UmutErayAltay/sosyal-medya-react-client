import { ApiError } from "../lib/api";

const ERROR_MESSAGES: Record<string, string> = {
  rate_limited: "Çok fazla deneme yapıldı, biraz sonra tekrar dene.",
  invalid_credentials: "E-posta veya şifre hatalı.",
  mfa_required: "Bu hesapta iki adımlı doğrulama açık, bu istemci henüz onu desteklemiyor.",
  email_taken: "Bu e-posta zaten kayıtlı.",
  username_taken: "Bu kullanıcı adı alınmış.",
  short_username: "Kullanıcı adı en az 3 karakter olmalı.",
  unauthorized: "Oturumun sona ermiş, tekrar giriş yap.",
  not_found: "Bulunamadı.",
};

export function describeApiError(err: unknown): string {
  if (err instanceof ApiError) {
    return ERROR_MESSAGES[err.code] ?? "Beklenmeyen bir hata oluştu.";
  }
  return "Sunucuya ulaşılamadı. Backend çalışıyor mu?";
}

export function LoadingState({ label = "yükleniyor…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 font-mono-chrome text-xs text-ink-soft">
      <span className="tick">…</span>
      <span>{label}</span>
    </div>
  );
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  return (
    <div className="mx-auto max-w-sm border border-accent/40 bg-accent-soft/40 px-4 py-6 text-center">
      <p className="font-mono-chrome text-xs text-accent">{describeApiError(error)}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 border border-accent/50 px-3 py-1 font-mono-chrome text-xs text-accent hover:bg-accent hover:text-paper"
        >
          tekrar dene
        </button>
      )}
    </div>
  );
}
