import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { InlineError, describeApiError } from "../components/StateViews";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(describeApiError(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-sm px-4">
      <div className="shadow-card rounded-3xl border border-border bg-surface p-8">
        <h1 className="font-display text-2xl font-semibold text-text">giriş yap</h1>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-text-soft">e-posta</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-11 rounded-xl border border-border bg-bg/50 px-4 text-text focus:border-accent focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-text-soft">şifre</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-11 rounded-xl border border-border bg-bg/50 px-4 text-text focus:border-accent focus:outline-none"
            />
          </label>
          {error && <InlineError>{error}</InlineError>}
          <button
            type="submit"
            disabled={submitting}
            className="shadow-glow mt-2 flex min-h-11 items-center justify-center rounded-xl bg-linear-to-r from-accent-strong to-accent-2 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:from-surface-2 disabled:to-surface-2 disabled:text-text-soft disabled:shadow-none"
          >
            {submitting ? "giriş yapılıyor…" : "giriş yap"}
          </button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm text-text-soft">
        hesabın yok mu?{" "}
        <Link to="/register" className="font-medium text-accent hover:underline">
          kayıt ol
        </Link>
      </p>
    </div>
  );
}
