import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import defaultUserIcon from "../../assets/images/defaultusericon.avif";
import { fetchAllBloggers } from "../../services/blogger-service";
import { AuthContext } from "../../context/AuthContext";

const BloggerList = () => {
  const [bloggers, setBloggers] = useState();
  const { setPostsType } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      await fetchAllBloggers()
        .then((response) => {
          setBloggers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bloggers:", error);
        });
    };

    fetch();
  }, []);

  const handleClick = (blogger) => {
    setPostsType(blogger.userId.toString());
  };

  return (
    <Stack direction="column" spacing={1} alignItems="flex-start">
      {bloggers?.map((blogger, index) => (
        <Chip
          key={blogger.userId}
          onClick={() => handleClick(blogger)}
          avatar={
            <Avatar
              alt={blogger.bloggerName}
              src={
                blogger.profilePicture
                  ? blogger.profilePicture
                  : defaultUserIcon
              }
            />
          }
          label={blogger.bloggerName}
          variant="filled"
          size="medium"
          // color="primary"
        />
      ))}
    </Stack>
  );
};

export default BloggerList;
