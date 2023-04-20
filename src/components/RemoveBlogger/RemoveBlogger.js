import React, { useEffect, useState } from "react";
import {
  fetchAllCommunities,
  removeBlogger,
} from "../../services/admin-service";
import "./removeblogger.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function RemoveBlogger() {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [bloggers, setBloggers] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Fetch list of communities from backend API on component mount
  useEffect(() => {
    const fetch = async () => {
      await fetchAllCommunities()
        .then((response) => {
          setCommunities(response.data);
        })
        .catch((error) => {
          console.log("Error fetching communities", error);
        });
    };

    fetch();
    // fetch("/api/communities")
    //   .then(response => response.json())
    //   .then(data => {
    //     setCommunities(data);
    //   })
    //   .catch(error => {
    //     console.error("Error fetching communities:", error);
    //   });
  }, []);

  const handleCommunitySelect = (event) => {
    setShowSuccessMessage(false);
    const communityId = Number(event.target.value);
    const selectedCommunity = communities.find(
      (c) => c.communityId === communityId
    );
    setSelectedCommunity(selectedCommunity);
    console.log(selectedCommunity);
    setBloggers(selectedCommunity.members);
  };

  const handleBloggerRemove = async (bloggerId) => {
    // Make API call to backend to remove blogger with provided ID from selected community
    await removeBlogger(selectedCommunity.communityId, bloggerId)
      .then((response) => {
        if (response.data) {
          setShowSuccessMessage(true);
          setBloggers(bloggers.filter((b) => b.userId !== bloggerId));
        } else {
          console.error("Error removing blogger:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error removing blogger:", error);
      });
  };

  return (
    <div>
      <h2>Remove Blogger</h2>
      <label htmlFor="communitySelect">Select a community:</label>
      <select id="communitySelect" onChange={handleCommunitySelect}>
        <option value="">-- Select --</option>
        {communities.map((community) => (
          <option key={community.communityId} value={community.communityId}>
            {community.communityName}
          </option>
        ))}
      </select>
      {selectedCommunity && (
        <div>
          <h3>Bloggers in {selectedCommunity.communityName}:</h3>
          <Stack direction="column" spacing={2}>
            {bloggers.map((blogger) => (
              <p key={blogger.userId}>
                {blogger.bloggerName}
                <Button
                  variant="contained"
                  onClick={() => handleBloggerRemove(blogger.userId)}
                >
                  Remove
                </Button>
              </p>
            ))}
          </Stack>
        </div>
      )}
      {showSuccessMessage && <p>Blogger removed successfully!</p>}
    </div>
  );
}

export default RemoveBlogger;
