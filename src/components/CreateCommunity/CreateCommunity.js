import React, { useState } from "react";
import { createCommunity } from "../../services/admin-service";
import './createcommunity.css'

function CreateCommunity() {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createCommunity(communityName, communityDescription).then((response) => {
        console.log(response.data);
        setShowSuccessMessage(true);
    }).catch((error) => {
        console.log("Error creating community");
    });

    

    

  };

  return (
    <div className="create-community-container">
      <h2>Create Community</h2>
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
        <button type="submit">Create Community</button>
      </form>
      {showSuccessMessage && (
        <p>Community created successfully!</p>
      )}
    </div>
  );
}

export default CreateCommunity;
