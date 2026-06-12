import { Link, useLocation } from "react-router-dom";

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const Sidebar = ({ user, logout }) => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Murmur</div>

      <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
        <IconHome />
        <span>Inicio</span>
      </Link>

      <button className="nav-item">
        <IconSearch />
        <span>Explorar</span>
      </button>

      <button className="nav-item">
        <IconBell />
        <span>Notificaciones</span>
      </button>

      <Link to="/profile" className={`nav-item ${location.pathname === "/profile" ? "active" : ""}`}>
        <IconUser />
        <span>Perfil</span>
      </Link>

      <div className="sidebar-bottom">
        {user && (
          <div className="sidebar-user">
            <div className="avatar sm">{getInitials(user.username)}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.username}</div>
              <div className="sidebar-user-handle">@{user.username.toLowerCase()}</div>
            </div>
          </div>
        )}

        {user ? (
          <button className="logout-btn" onClick={logout}>
            <IconLogout />
            <span>Cerrar sesión</span>
          </button>
        ) : (
          <Link to="/login" className="btn-primary" style={{ textAlign: "center", display: "block", padding: "10px" }}>
            Entrar
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
