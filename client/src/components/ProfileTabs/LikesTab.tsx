import axios from "axios";
import { useEffect, useState } from "react";
import TweetsDisplay from "../TweetsDisplay";

const LikesTab = () => {
  type Post = {
    _id: string;
    user: string;
    text: string;
    likes: string[];
    comments: string[];
    date: string;
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [likes, setLikes] = useState([]);

  const getUserLikes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/auth/${localStorage.getItem("userID")}`
      );
      setLikes(response.data.likes);
    } catch (error) {
      console.error(error);
    }
  };

  const getLikedPosts = async () => {
    for (let i = 0; i < likes.length; i++) {
      try {
        const response = await axios.get(
          `http://localhost:8000/posts/${likes[i]}`
        );
        console.log(response.data);
        setPosts((prevPosts) => [...prevPosts, response.data]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getUserLikes();
    getLikedPosts();
    console.log(posts);
  }, [posts]);

  return (
    <div>
      <h1 className="text-white">{}</h1>
      {<TweetsDisplay tweets={posts} />}
    </div>
  );
};

export default LikesTab;
