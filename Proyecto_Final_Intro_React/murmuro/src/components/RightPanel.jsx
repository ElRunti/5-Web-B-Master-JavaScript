const TRENDS = [
  { tag: "#ReactJS", count: "4,210 murmullos" },
  { tag: "#localStorage", count: "1,890 murmullos" },
  { tag: "#Vite", count: "920 murmullos" },
  { tag: "#Frontend", count: "3,441 murmullos" },
  { tag: "#JavaScript", count: "12,300 murmullos" },
];

const SUGGESTIONS = [
  { name: "Dan Abramov", handle: "gaearon" },
  { name: "Kent C. Dodds", handle: "kentcdodds" },
  { name: "Cassidy Williams", handle: "cassidoo" },
];

const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const RightPanel = () => {
  return (
    <aside className="right-panel">
      <div className="search-bar">
        <IconSearch />
        <input type="text" placeholder="Buscar en Murmur" />
      </div>

      <div className="panel-card">
        <div className="panel-card-title">Tendencias</div>
        {TRENDS.map((t) => (
          <div className="trend-item" key={t.tag}>
            <div className="trend-tag">{t.tag}</div>
            <div className="trend-count">{t.count}</div>
          </div>
        ))}
      </div>

      <div className="panel-card">
        <div className="panel-card-title">A quién seguir</div>
        {SUGGESTIONS.map((s) => (
          <div className="suggest-item" key={s.handle}>
            <div className="avatar sm">{getInitials(s.name)}</div>
            <div className="suggest-info">
              <div className="suggest-name">{s.name}</div>
              <div className="suggest-handle">@{s.handle}</div>
            </div>
            <button className="btn-outline" style={{ padding: "5px 14px", fontSize: 12 }}>
              Seguir
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightPanel;
