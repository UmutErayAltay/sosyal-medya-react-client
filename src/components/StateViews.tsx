import type { ReactNode } from "react";
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
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-text-soft">
      <span
        aria-hidden="true"
        className="h-4 w-4 animate-spin rounded-full border-2 border-border-strong border-t-accent"
      />
      <span>{label}</span>
    </div>
  );
}

export function InlineError({ children }: { children: ReactNode }) {
  return <p className="text-sm text-danger">{children}</p>;
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  return (
    <div className="shadow-card mx-auto max-w-sm rounded-2xl border border-border bg-surface p-8 text-center">
      <p className="text-sm text-danger">{describeApiError(error)}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-border px-4 text-sm text-text-soft transition-colors hover:border-accent hover:text-accent"
        >
          tekrar dene
        </button>
      )}
    </div>
  );
}
