import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./adminhome.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function AdminHome() {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="admin-home">
      <nav>
        <Stack direction="row" spacing={7}>
          <Button variant="contained">
            <Link
              to="/admin/create-community"
              className={
                activeLink === "/admin/create-community" ? "active" : ""
              }
              onClick={() => handleLinkClick("/admin/create-community")}
            >
              Create Community
            </Link>
          </Button>
          <Button variant="contained">
            <Link
              to="/admin/modify-community"
              className={
                activeLink === "/admin/modify-community" ? "active" : ""
              }
              onClick={() => handleLinkClick("/admin/modify-community")}
            >
              Modify Community
            </Link>
          </Button>
          <Button variant="contained">
            <Link
              to="/admin/add-blogger"
              className={activeLink === "/admin/add-blogger" ? "active" : ""}
              onClick={() => handleLinkClick("/admin/add-blogger")}
            >
              Add Blogger
            </Link>
          </Button>
          <Button variant="contained">
            <Link
              to="/admin/remove-blogger"
              className={activeLink === "/admin/remove-blogger" ? "active" : ""}
              onClick={() => handleLinkClick("/admin/remove-blogger")}
            >
              Remove Blogger
            </Link>
          </Button>
          <Button variant="contained">
            <Link
              to="/admin/promote-blogger"
              className={
                activeLink === "/admin/promote-blogger" ? "active" : ""
              }
              onClick={() => handleLinkClick("/admin/promote-blogger")}
            >
              Promote Blogger
            </Link>
          </Button>
        </Stack>
      </nav>
    </div>
  );
}

export default AdminHome;
