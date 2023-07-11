import axios from "axios";
import Tweet from "./Tweet";
import WriteTweet from "./WriteTweet";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";

export interface StateInterface {
  triggerRender: boolean;
  setTriggerRender: Dispatch<SetStateAction<boolean>>;
}

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [triggerRender, setTriggerRender] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log(triggerRender);
      try {
        const response = await axios.get("http://localhost:8000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [triggerRender]);

  return (
    <div className="overflow-y-scroll max-h-screen scrollbar-none">
      <h1 className="text-white font-bold text-2xl text-left  w-full border-[1px] border-zinc-800 pb-4 pl-3 pt-3 mb-0">
        Home
      </h1>
      <WriteTweet trigger={triggerRender} setTrigger={setTriggerRender} />

      <div className="">
        {posts
          .slice(0)
          .reverse()
          .map((post: any) => (
            <Tweet
              username={post.username}
              text={post.text}
              likes={post.likes ? post.likes.length : 0}
              liked={
                post.likes
                  ? post.likes.includes(localStorage.getItem("userID"))
                  : false
              }
              postID={post._id}
              trigger={triggerRender}
              setTrigger={setTriggerRender}
              key={post._id}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
