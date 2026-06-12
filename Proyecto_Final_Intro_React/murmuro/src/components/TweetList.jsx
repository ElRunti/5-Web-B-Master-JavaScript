import Tweet from "./Tweet";

const TweetList = ({ tweets, onLike }) => {
  if (tweets.length === 0) {
    return (
      <div className="empty-feed">
        <p style={{ fontSize: 32 }}>✦</p>
        <p>Aún no hay murmullos.</p>
        <p style={{ fontSize: 13, marginTop: 4 }}>¡Sé el primero en escribir algo!</p>
      </div>
    );
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} onLike={onLike} />
      ))}
    </div>
  );
};

export default TweetList;
