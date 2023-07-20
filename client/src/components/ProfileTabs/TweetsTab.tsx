import axios from "axios";
import { useEffect, useState } from "react";
import TweetsDisplay from "../TweetsDisplay";

const TweetsTab = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/posts");
      setPosts(
        response.data.filter(
          (post: any) => post.user === localStorage.getItem("userID")
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="mt-3">
      <TweetsDisplay tweets={posts} />
    </div>
  );
};

export default TweetsTab;
