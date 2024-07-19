import React, { useEffect, useState } from "react";
import moment from "moment";
export default function Comment({ comment }) {
  const [user, setUser] = useState({});
  console.log("Comment user", user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${comment.userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="h-10 w-10 object-cover rounded-full bg-gray-300"
          src={user.profilePicture}
          alt=""
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="mr-1 ttext-xs truncate font-bold">
            @{user ? user.username : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
      </div>
    </div>
  );
}
