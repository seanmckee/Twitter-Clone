import axios from "axios";
import { useEffect, useState } from "react";
import TweetsDisplay from "../TweetsDisplay";

interface Props {
  tabSelection: string;
}

const LikesTab = ({ tabSelection }: Props) => {
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

  useEffect(() => {
    const getLikedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/posts/likes/${localStorage.getItem("userID")}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getLikedPosts();
  }, []);

  return (
    <div>
      <h1 className="text-white">test</h1>
      {<TweetsDisplay tweets={posts} />}
    </div>
  );
};

export default LikesTab;
