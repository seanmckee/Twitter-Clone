import { useState } from "react";
import TweetsTab from "./ProfileTabs/TweetsTab";
import LikesTab from "./ProfileTabs/LikesTab";

const Profile = () => {
  const [tabSelection, setTabSelection] = useState("Tweets");

  const clickTweets = () => {
    setTabSelection("Tweets");
  };
  const clickReplies = () => {
    setTabSelection("Replies");
  };
  const clickLikes = () => {
    setTabSelection("Likes");
  };
  const clickRetweets = () => {
    setTabSelection("Retweets");
  };

  const renderTabContent = () => {
    if (tabSelection === "Tweets") {
      return <TweetsTab />;
    } else if (tabSelection === "Replies") {
      return <div className="text-white">Replies content here</div>;
    } else if (tabSelection === "Likes") {
      return <LikesTab tabSelection={tabSelection} />;
    } else if (tabSelection === "Retweets") {
      return <div className="text-white">Retweets content here</div>;
    } else {
      return <div>Default content here</div>;
    }
  };

  return (
    <div className="p-3">
      <h1 className="text-white text-2xl font-bold">username</h1>
      <p className="text-white">0 Tweets</p>
      <div className="flex text-white">
        <p className="mr-2">
          0 <span className="text-md">Following</span>
        </p>
        <p className="">
          0 <span className="text-md">Followers</span>
        </p>
      </div>
      <ul className="text-white flex justify-center">
        <li
          onClick={clickTweets}
          className={
            tabSelection == "Tweets"
              ? "p-2 underline decoration-blue-400 decoration-2 underline-offset-4 flex flex-grow items-center justify-center hover:bg-slate-900"
              : "p-2 flex flex-grow items-center justify-center hover:bg-slate-900"
          }
        >
          Tweets
        </li>
        <li
          onClick={clickReplies}
          className={
            tabSelection == "Replies"
              ? "p-2 underline decoration-blue-400 decoration-2 underline-offset-4 flex flex-grow items-center justify-center hover:bg-slate-900"
              : "p-2 flex flex-grow items-center justify-center hover:bg-slate-900"
          }
        >
          Replies
        </li>
        <li
          onClick={clickLikes}
          className={
            tabSelection == "Likes"
              ? "p-2 underline decoration-blue-400 decoration-2 underline-offset-4 flex flex-grow items-center justify-center hover:bg-slate-900"
              : "p-2 flex flex-grow items-center justify-center hover:bg-slate-900"
          }
        >
          Likes
        </li>
        <li
          onClick={clickRetweets}
          className={
            tabSelection == "Retweets"
              ? "p-2 underline decoration-blue-400 decoration-2 underline-offset-4 flex flex-grow items-center justify-center hover:bg-slate-900"
              : "p-2 flex flex-grow items-center justify-center hover:bg-slate-900"
          }
        >
          Retweets
        </li>
      </ul>

      <div>
        {/* Render the tab content */}
        {renderTabContent()}
        {/* Rest of your JSX */}
      </div>
    </div>
  );
};

export default Profile;
