import axios from "axios";
import Tweet from "./Tweet";
import WriteTweet from "./WriteTweet";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="overflow-y-scroll max-h-screen scrollbar-none">
      <h1 className="text-white font-bold text-2xl text-left  w-full border-[1px] border-zinc-800 pb-4 pl-3 pt-3 mb-0">
        Home
      </h1>
      <WriteTweet />

      <div className="">
        {posts.map((post: any) => (
          <Tweet
            username={post.username}
            text={post.text}
            likes={post.likes ? post.likes.length : 0}
            key={post._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
