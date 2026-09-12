import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-text">
          sosyal<span className="text-accent">.</span>log
        </Link>
        {user && (
          <nav className="flex items-center gap-3">
            <Link
              to={`/profile/${user.username}`}
              className="text-sm text-text-soft transition-colors hover:text-text"
            >
              @{user.username}
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-3 text-sm text-text-soft transition-colors hover:border-accent hover:text-accent"
            >
              çıkış
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
