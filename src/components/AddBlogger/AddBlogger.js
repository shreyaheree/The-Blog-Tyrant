import React, { useEffect, useState } from "react";
import { fetchAllCommunities, addBlogger } from "../../services/admin-service";
import { fetchAllBloggers } from "../../services/blogger-service";
import "./addblogger.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function AddBlogger() {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [allBloggers, setAllBloggers] = useState([]);
  const [communityBloggers, setCommunityBloggers] = useState([]);
  const [notInCommunityBloggers, setNotInCommunityBloggers] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Fetch list of communities and all bloggers from backend API on component mount
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

    const fetchBloggers = async () => {
      await fetchAllBloggers()
        .then((response) => {
          setAllBloggers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bloggers:", error);
        });
    };

    fetch();
    fetchBloggers();

    // fetch("/api/communities")
    //   .then(response => response.json())
    //   .then(data => {
    //     setCommunities(data);
    //   })
    //   .catch(error => {
    //     console.error("Error fetching communities:", error);
    //   });

    // fetch("/api/bloggers")
    //   .then(response => response.json())
    //   .then(data => {
    //     setAllBloggers(data);
    //   })
    //   .catch(error => {
    //     console.error("Error fetching bloggers:", error);
    //   });
  }, []);

  // Update communityBloggers and notInCommunityBloggers when selectedCommunity changes
  useEffect(() => {
    if (selectedCommunity) {
      setCommunityBloggers(selectedCommunity.members);
      setNotInCommunityBloggers(
        allBloggers.filter(
          (b) => !selectedCommunity.members.some((cb) => cb.userId === b.userId)
        )
      );
    } else {
      setCommunityBloggers([]);
      setNotInCommunityBloggers([]);
    }
  }, [selectedCommunity, allBloggers]);

  const handleCommunitySelect = (event) => {
    const communityId = Number(event.target.value);
    const selectedCommunity = communities.find(
      (c) => c.communityId === communityId
    );
    setSelectedCommunity(selectedCommunity);
  };

  const handleBloggerAdd = async (bloggerId) => {
    // Make API call to backend to add blogger with provided ID to selected community
    await addBlogger(selectedCommunity.communityId, bloggerId)
      .then((response) => {
        if (response.data) {
          setShowSuccessMessage(true);
          setCommunityBloggers([
            ...communityBloggers,
            allBloggers.find((b) => b.userId === bloggerId),
          ]);
          setNotInCommunityBloggers(
            notInCommunityBloggers.filter((b) => b.userId !== bloggerId)
          );
        } else {
          console.error("Error adding blogger:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error adding blogger:", error);
      });
  };

  return (
    <div className="add-blogger">
      <h2>Add Blogger</h2>
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
          <Stack direaction="column" spacing={2} alignItems="flex-start">
            {communityBloggers.map((blogger) => (
              <div class="blogger-list" key={blogger.userId}>
                {blogger.bloggerName}
              </div>
            ))}
          </Stack>
          <h3>Bloggers not in {selectedCommunity.communityName}:</h3>
          <Stack direction="column" spacing={2} alignItems="flex-start">
            {notInCommunityBloggers.map((blogger) => (
              <div class="blogger-list" key={blogger.userId}>
                {blogger.bloggerName}
                <button onClick={() => handleBloggerAdd(blogger.userId)}>
                  Add
                </button>
              </div>
            ))}
          </Stack>
        </div>
      )}
      {showSuccessMessage && <p>Blogger added successfully!</p>}
    </div>
  );
}

export default AddBlogger;
