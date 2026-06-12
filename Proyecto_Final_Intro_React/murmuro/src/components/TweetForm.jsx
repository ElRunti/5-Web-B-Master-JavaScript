import { useState } from "react";

const MAX_CHARS = 280;

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const TweetForm = ({ user, onAddTweet }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !user) return;
    onAddTweet(text.trim());
    setText("");
  };

  const remaining = MAX_CHARS - text.length;
  const isOver = remaining < 0;

  return (
    <div className="compose-box">
      <div className="avatar">
        {user ? getInitials(user.username) : "?"}
      </div>
      <div className="compose-right">
        {!user ? (
          <p style={{ fontSize: 14, color: "var(--text-muted)", paddingTop: 8 }}>
            <a href="/login" style={{ color: "var(--accent)", fontWeight: 500 }}>Inicia sesión</a>{" "}
            para murmurar.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              className="compose-textarea"
              placeholder="¿Qué estás pensando?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
            />
            <div className="compose-footer">
              <span
                className="char-count"
                style={{ color: isOver ? "#e24b4a" : remaining < 30 ? "#ef9f27" : undefined }}
              >
                {remaining}
              </span>
              <button
                className="btn-primary"
                type="submit"
                disabled={!text.trim() || isOver}
              >
                Murmurar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TweetForm;
