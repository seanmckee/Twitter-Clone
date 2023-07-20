import axios from "axios";
import { useEffect, useState } from "react";
import Tweet from "../Tweet";

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
      {posts &&
        posts
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
              key={post._id}
            />
          ))}
    </div>
  );
};

export default TweetsTab;
