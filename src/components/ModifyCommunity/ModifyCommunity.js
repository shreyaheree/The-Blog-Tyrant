import React, { useEffect, useState } from "react";
import { fetchAllCommunities, updateCommunity } from "../../services/admin-service";
import './modifycommunity.css'

function ModifyCommunity() {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {

    const fetch = async () => {
        await fetchAllCommunities().then((response) => {
            setCommunities(response.data);
        }).catch((error) => {
            console.log("Error fetching communities", error);
        });
    }

    fetch();
    
  }, []);

  const handleCommunitySelect = (event) => {
    const communityId = Number(event.target.value);
    const selectCommunity = communities.find(c => c.communityId === communityId);
    setSelectedCommunity(selectCommunity);
    setCommunityName(selectCommunity.communityName);
    setCommunityDescription(selectCommunity.communityDescription);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await updateCommunity(selectedCommunity.communityId,communityName,
        communityDescription).then(async (response) => {
            console.log('here', response.data);
            if(response.data){
                setShowSuccessMessage(true);
                await fetchAllCommunities().then((response) => {
                    setCommunities(response.data);
                })
            }else {
                console.error("Error updating community:", response.statusText);
            }
            })
            .catch(error => {
            console.error("Error updating community:", error);
            });


    
  };

  return (
    <div>
      <h2>Modify Community</h2>
      <label htmlFor="communitySelect">Select a community:</label>
      <select id="communitySelect" onChange={handleCommunitySelect}>
        <option value="">-- Select --</option>
        {communities.map(community => (
          <option key={community.communityId} value={community.communityId}>
            {community.communityName}
          </option>
        ))}
      </select>
      {selectedCommunity && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="communityName">Community Name:</label>
          <input
            id="communityName"
            type="text"
            value={communityName}
            onChange={(event) => setCommunityName(event.target.value)}
            required
          />
          <br />
          <label htmlFor="communityDescription">Community Description:</label>
          <textarea
            id="communityDescription"
            value={communityDescription}
            onChange={(event) => setCommunityDescription(event.target.value)}
            required
          />
          <br />
          <button type="submit">Update Community</button>
        </form>
      )}
      {showSuccessMessage && (
        <p>Community updated successfully!</p>
      )}
    </div>
  );
}

export default ModifyCommunity;
