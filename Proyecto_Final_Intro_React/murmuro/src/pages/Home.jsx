import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TweetForm from "../components/TweetForm";
import TweetList from "../components/TweetList";
import RightPanel from "../components/RightPanel";

const SEED_TWEETS = [
  {
    id: 1,
    author: "Ana López",
    handle: "analopez",
    text: "Acabo de terminar mi primer proyecto con React y me siento increíble. Los hooks son magia pura ✨",
    likes: 24,
    replies: 3,
    liked: false,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    author: "Carlos Rodas",
    handle: "crodas",
    text: "¿Alguien más siente que localStorage es subestimado? Para proyectos pequeños es perfecto.",
    likes: 11,
    replies: 7,
    liked: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    author: "María Fuentes",
    handle: "mfdev",
    text: "React Router v6 cambió la forma en que pienso el enrutamiento. Las rutas protegidas son elegantísimas.",
    likes: 38,
    replies: 5,
    liked: false,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    author: "Dev Guerrero",
    handle: "devgro",
    text: "useEffect sigue siendo el hook más interesante y a la vez el más confuso. Nunca termina de sorprenderme.",
    likes: 57,
    replies: 12,
    liked: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
];

const Home = ({ user, logout }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("murmur_tweets");
    if (stored) {
      setTweets(JSON.parse(stored));
    } else {
      setTweets(SEED_TWEETS);
      localStorage.setItem("murmur_tweets", JSON.stringify(SEED_TWEETS));
    }
  }, []);

  useEffect(() => {
    if (tweets.length > 0) {
      localStorage.setItem("murmur_tweets", JSON.stringify(tweets));
    }
  }, [tweets]);

  const addTweet = (text) => {
    const newTweet = {
      id: Date.now(),
      author: user.username,
      handle: user.username.toLowerCase().replace(/\s+/g, ""),
      text,
      likes: 0,
      replies: 0,
      liked: false,
      createdAt: new Date().toISOString(),
    };
    setTweets((prev) => [newTweet, ...prev]);
  };

  const likeTweet = (id) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, likes: t.liked ? t.likes - 1 : t.likes + 1, liked: !t.liked }
          : t
      )
    );
  };

  return (
    <div className="app-layout">
      <Sidebar user={user} logout={logout} />
      <main className="main-content">
        <div className="feed-header">Para ti</div>
        <TweetForm user={user} onAddTweet={addTweet} />
        <TweetList tweets={tweets} onLike={likeTweet} />
      </main>
      <RightPanel />
    </div>
  );
};

export default Home;
