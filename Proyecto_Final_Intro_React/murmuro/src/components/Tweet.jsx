const IconHeart = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const IconMessage = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconShare = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const formatTime = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return date.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
};

const Tweet = ({ tweet, onLike }) => {
  return (
    <article className="tweet-card">
      <div className="avatar">{getInitials(tweet.author)}</div>
      <div className="tweet-body">
        <div className="tweet-header">
          <span className="tweet-name">{tweet.author}</span>
          <span className="tweet-handle">@{tweet.handle} · {formatTime(tweet.createdAt)}</span>
        </div>
        <p className="tweet-text">{tweet.text}</p>
        <div className="tweet-actions">
          <button className="action-btn">
            <IconMessage />
            <span>{tweet.replies || 0}</span>
          </button>
          <button
            className={`action-btn ${tweet.liked ? "liked" : ""}`}
            onClick={() => onLike(tweet.id)}
            aria-label={tweet.liked ? "Quitar me gusta" : "Me gusta"}
          >
            <IconHeart filled={tweet.liked} />
            <span>{tweet.likes}</span>
          </button>
          <button className="action-btn">
            <IconShare />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
