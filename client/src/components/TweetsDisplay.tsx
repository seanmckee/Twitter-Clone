import Tweet from "./Tweet";

interface TweetsDisplayProps {
  tweets: any[];
}

const TweetsDisplay = ({ tweets }: TweetsDisplayProps) => {
  // display tweets given a list of tweets in props
  return (
    <div>
      {tweets &&
        tweets
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

export default TweetsDisplay;
