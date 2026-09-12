import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { describeApiError } from "../components/StateViews";

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
    <div className="mx-auto flex max-w-sm flex-col gap-6 px-4 py-16">
      <h1 className="font-mono-chrome text-xs uppercase tracking-widest text-ink-soft">giriş</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1">
          <span className="font-mono-chrome text-[11px] uppercase tracking-wide text-ink-soft">e-posta</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-0 border-b border-ink/25 bg-transparent px-0 py-1.5 text-ink focus:border-ink focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono-chrome text-[11px] uppercase tracking-wide text-ink-soft">şifre</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-0 border-b border-ink/25 bg-transparent px-0 py-1.5 text-ink focus:border-ink focus:outline-none"
          />
        </label>
        {error && <p className="font-mono-chrome text-xs text-accent">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="border border-ink px-4 py-2 font-medium text-ink hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/25 disabled:text-ink-soft disabled:hover:bg-transparent"
        >
          {submitting ? "giriş yapılıyor…" : "giriş yap"}
        </button>
      </form>
      <p className="font-mono-chrome text-xs text-ink-soft">
        hesabın yok mu?{" "}
        <Link to="/register" className="text-ink underline">
          kayıt ol
        </Link>
      </p>
    </div>
  );
}
