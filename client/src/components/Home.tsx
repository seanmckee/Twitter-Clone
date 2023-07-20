import axios from "axios";
import WriteTweet from "./WriteTweet";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import TweetsDisplay from "./TweetsDisplay";

export interface StateInterface {
  triggerRender: boolean;
  setTriggerRender: Dispatch<SetStateAction<boolean>>;
}

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [triggerRender, setTriggerRender] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/posts");
      setPosts(response.data);
      setTriggerRender(!triggerRender);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [triggerRender]);

  return (
    <div className="overflow-y-scroll max-h-screen scrollbar-none">
      <h1 className="text-white font-bold text-2xl text-left  w-full border-[1px] border-zinc-800 pb-4 pl-3 pt-3 mb-0">
        Home
      </h1>
      <WriteTweet trigger={triggerRender} setTrigger={setTriggerRender} />
      <TweetsDisplay tweets={posts} />
    </div>
  );
};

export default Home;
