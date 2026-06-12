import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TweetList from "../components/TweetList";
import RightPanel from "../components/RightPanel";

const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

const Profile = ({ user, logout }) => {
  const [tweets, setTweets] = useState([]);
  const [activeTab, setActiveTab] = useState("murmullos");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("murmur_tweets");
    if (stored) {
      const all = JSON.parse(stored);
      const handle = user.username.toLowerCase().replace(/\s+/g, "");
      setTweets(all.filter((t) => t.handle === handle));
    }
  }, [user]);

  const likeTweet = (id) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, likes: t.liked ? t.likes - 1 : t.likes + 1, liked: !t.liked }
          : t
      )
    );
  };

  const joinYear = user.joinedAt
    ? new Date(user.joinedAt).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="app-layout">
      <Sidebar user={user} logout={logout} />
      <main className="main-content">
        <div className="feed-header" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate("/")}
            style={{ background: "transparent", padding: "4px", borderRadius: 8, color: "var(--text-secondary)", display: "flex" }}
            aria-label="Volver"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          {user.username}
        </div>

        <div className="profile-banner" />

        <div className="profile-info">
          <div className="profile-avatar-wrap">
            <div className="avatar lg">{getInitials(user.username)}</div>
          </div>
          <div className="profile-name">{user.username}</div>
          <div className="profile-handle">
            @{user.username.toLowerCase().replace(/\s+/g, "")} · Se unió en {joinYear}
          </div>
          <p className="profile-bio">
            Explorando el mundo del desarrollo web. Amante de React y el café.
          </p>
          <div className="profile-stats">
            <span className="profile-stat">
              <strong>{tweets.length}</strong> murmullos
            </span>
            <span className="profile-stat">
              <strong>0</strong> siguiendo
            </span>
            <span className="profile-stat">
              <strong>0</strong> seguidores
            </span>
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === "murmullos" ? "active" : ""}`}
            onClick={() => setActiveTab("murmullos")}
          >
            Murmullos
          </button>
          <button
            className={`profile-tab ${activeTab === "me-gusta" ? "active" : ""}`}
            onClick={() => setActiveTab("me-gusta")}
          >
            Me gusta
          </button>
        </div>

        {activeTab === "murmullos" ? (
          <TweetList tweets={tweets} onLike={likeTweet} />
        ) : (
          <div className="empty-feed">
            <p style={{ fontSize: 32 }}>♡</p>
            <p>Aún no has dado me gusta a ningún murmullo.</p>
          </div>
        )}
      </main>
      <RightPanel />
    </div>
  );
};

export default Profile;
