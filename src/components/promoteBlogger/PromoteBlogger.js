import React, { useEffect, useState } from "react";
import { fetchAllBloggers, promoteBlogger } from "../../services/blogger-service";
import './promoteblogger.css';

function PromoteBlogger() {
  const [bloggers, setBloggers] = useState([]);
  const [selectedBlogger, setSelectedBlogger] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Fetch list of bloggers from backend API on component mount
  useEffect(() => {

    const fetch = async () => {
        await fetchAllBloggers().then((response) => {
            setBloggers(response.data);
        }).catch(error => {
                console.error("Error fetching bloggers:", error);
              });
    };

    fetch();

    // fetch("/api/bloggers")
    //   .then(response => response.json())
    //   .then(data => {
    //     setBloggers(data);
    //   })
    //   .catch(error => {
    //     console.error("Error fetching bloggers:", error);
    //   });
  }, []);

  const handleBloggerSelect = (event) => {
    const bloggerId = Number(event.target.value);
    const selectedBlogger = bloggers.find(b => b.userId === bloggerId);
    setSelectedBlogger(selectedBlogger);
  };

  const handlePromoteClick = () => {
    // Make API call to backend to promote selected blogger to moderator
    console.log(selectedBlogger.userId);
    promoteBlogger(selectedBlogger.userId)
    .then(response => {
      if (response.data) {
        setShowSuccessMessage(true);
      } else {
        console.error("Error promoting blogger:", response.statusText);
      }
    })
    .catch(error => {
      console.error("Error promoting blogger:", error);
    });
  };

  return (
    <div className="promote-blogger">
      <h2>Promote Blogger</h2>
      <label htmlFor="bloggerSelect">Select a blogger:</label>
      <select id="bloggerSelect" onChange={handleBloggerSelect}>
        <option value="">-- Select --</option>
        {bloggers.map(blogger => (
          <option key={blogger.userId} value={blogger.userId}>
            {blogger.bloggerName}
          </option>
        ))}
      </select>
      {selectedBlogger && (
        <div className="selected-blogger">
          <h3>Selected Blogger:</h3>
          <p>{selectedBlogger.bloggerName} </p>
          <button onClick={handlePromoteClick}>Promote to Moderator</button>
        </div>
      )}
      {showSuccessMessage && <p>Blogger promoted successfully!</p>}
    </div>
  );
}


export default PromoteBlogger;