import axios from "axios";
import { useState } from "react";

const LikesTab = () => {
  const [posts, setPosts] = useState([]);
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

  return (
    <div>
      <h1>likes</h1>
    </div>
  );
};

export default LikesTab;
