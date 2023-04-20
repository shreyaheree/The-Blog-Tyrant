import React, { useState, useContext } from "react";
import ModalWindow from "../modalWindow/ModalWindow.tsx";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import InfoIcon from "@mui/icons-material/Info";
// import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MailIcon from "@mui/icons-material/Mail";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ homePage }) => {
  const [showModal, setShowModal] = useState(false);
  // const [postsType, setPostsType] = useState('latest');
  const { isAuth, isAdmin, postsType, setPostsType } = useContext(AuthContext);
  const navigate = useNavigate();
  //use dispatch here

  const handleClick = (path) => {
    if (isAuth) {
      return navigate(`/${path}`);
    } else {
      setShowModal(true);
    }
  };

  const handleSelectPosts = (type) => {
    // dispatch(fetchPosts({type: type}))
    setPostsType(type);
  };

  return (
    <div className={"sidebar"}>
      <ModalWindow setShowModal={setShowModal} showModal={showModal} />

      {homePage && (
        <div className={"menu"}>
          <h4>Order by</h4>
          <ul>
            <li
              className={postsType === "latest" ? "sidebarItem" : ""}
              onClick={() => handleSelectPosts("latest")}
            >
              <AccessTimeIcon className={"sidebarIcon"} />
              <span>Latest</span>
            </li>
            <li
              className={postsType === "hot" ? "sidebarItem" : ""}
              onClick={() => handleSelectPosts("hot")}
            >
              <LocalFireDepartmentIcon className={"sidebarIcon"} />
              <span>Hot</span>
            </li>
            <li
              className={postsType === "best" ? "sidebarItem" : ""}
              onClick={() => handleSelectPosts("best")}
            >
              <StarIcon className={"sidebarIcon"} />
              <span>Best</span>
            </li>
          </ul>
        </div>
      )}

      <div className={"menu bottom"}>
        <h4>Navigation</h4>
        <ul>
          <Link to={"/"} className={"link"}>
            <li>
              <HomeIcon className={"sidebarIcon"} />
              <span>Home</span>
            </li>
          </Link>
          <li onClick={() => handleClick("profile")}>
            <PersonIcon className={"sidebarIcon"} />
            <span>Profile</span>
          </li>
          <li onClick={() => handleClick("create")}>
            <CreateIcon className={"sidebarIcon"} />
            <span>Make Post</span>
          </li>
          <Link to={"about"} className={"link"}>
            <li>
              <InfoIcon className={"sidebarIcon"} />
              <span>About</span>
            </li>
          </Link>
          <Link to={"contact"} className={"link"}>
            <li>
              <MailIcon className={"sidebarIcon"} />
              <span>Contact</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
