import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-ink/15 bg-paper">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-semibold tracking-tight text-ink">
          sosyal.log
        </Link>
        {user && (
          <nav className="flex items-center gap-4 font-mono-chrome text-xs text-ink-soft">
            <Link to={`/profile/${user.username}`} className="hover:text-ink">
              @{user.username}
            </Link>
            <button
              type="button"
              onClick={logout}
              className="border border-ink/25 px-2 py-1 hover:border-ink hover:text-ink"
            >
              çıkış
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
