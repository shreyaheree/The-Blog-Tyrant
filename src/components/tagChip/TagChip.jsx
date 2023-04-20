import React, { useState } from "react";
import "./tagchip.scss";
import { hex2rgb } from "../../helpers/helpers.ts";
import { red } from "@mui/material/colors";

const TagChip = ({ tag }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
  };
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // key={tag.id}
      style={{
        border: `1px solid #7451f8`,
        backgroundColor: isHovering ? `blue, 0.2` : "unset",
        color: isHovering ? `#00A1DF` : "#0033a0",
      }}
      className={"postItemTag"}
      onClick={(e) => handleClick(e)}
    >
      <span style={{ color: `#00A1DF` }}></span>
      {tag}
    </div>
  );
};

export default TagChip;
