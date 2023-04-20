import React, { lazy,useContext } from "react";
import { Route, Routes } from "react-router-dom";
import PostDeleted from "../../pages/postdeleted/PostDeleted";
// import RequireAuth from "./RequireAuth";
// import CheckAdminRole from "./CheckAdminRole";
import { AuthContext } from "../../context/AuthContext";

const Home = lazy(() => import("../../pages/home/Home"));
const Login = lazy(() => import("../../pages/login/BloggerLogin"));
const Register = lazy(() => import("../../pages/register/Register"));
const NotFound = lazy(() => import("../../pages/404/NotFound.tsx"));
const CreatePost = lazy(() => import("../../pages/createPost/CreatePost"));
const Profile = lazy(() => import("../../pages/profile/Profile"));
const Post = lazy(() => import("../../pages/post/Post"));
const About = lazy(() => import("../../pages/about/About"));
const Contact = lazy(() => import("../../pages/contact/Contact"));
const AdminLogin = lazy(() => import("../../pages/login/AdminLogin"));
const AdminHome = lazy(() => import("../../pages/home/AdminHome"))
const CreateCommunity = lazy(() => import("../../components/CreateCommunity/CreateCommunity"));
const ModifyCommunity = lazy(() => import("../../components/ModifyCommunity/ModifyCommunity"));
const AddBlogger = lazy(() => import("../../components/AddBlogger/AddBlogger"));
const RemoveBlogger = lazy(() => import("../../components/RemoveBlogger/RemoveBlogger"));
const PromoteBlogger = lazy(() => import("../../components/promoteBlogger/PromoteBlogger"));
const ModeratorLogin = lazy(() => import("../../pages/login/ModeratorLogin"));
const ModHome = lazy(() => import("../../pages/home/ModHome"));

const AppRoutes = () => {

  const {isAuth, isAdmin, isModerator} = useContext(AuthContext);
  console.log('moderator', isModerator);
  console.log('admin', isAdmin);

  return (
    <>
    <Routes>
      <Route path={"/"}>
        <Route index element={<Home />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register />} />
        <Route path={"posts/:postId"} element={<Post />} />
        <Route path={"about"} element={<About />} />
        <Route path={"contact"} element={<Contact />} />
        <Route path={"postdeleted"} element={<PostDeleted />} />

        <Route path={"create"} element={isAuth? <CreatePost /> : <Login />} />
        <Route path={"profile"} element={isAuth? <Profile /> : <Login />} />
        <Route path={'edit/:postId'} element={isAuth? <CreatePost/> : <Login />}/>
        {/* <Route element={<CheckAdminRole/>}> */}
          {/* write admin pages here */}
        {/* </Route> */}
        <Route path={"*"} element={<NotFound />} />

        {/* admin routes */}
        <Route path={"admin/login"} element={<AdminLogin />} />
        <Route path={"admin/home"} element={isAdmin? <AdminHome /> : <AdminLogin />} />
        <Route path="/admin/create-community" element={isAdmin?<CreateCommunity /> : <AdminLogin />} />
        <Route path="/admin/modify-community" element={isAdmin?<ModifyCommunity /> : <AdminLogin />} />
        <Route path="/admin/add-blogger" element={isAdmin?<AddBlogger /> : <AdminLogin />} />
        <Route path="/admin/remove-blogger" element={isAdmin?<RemoveBlogger /> : <AdminLogin />} />
        <Route path="/admin/promote-blogger" element={isAdmin?<PromoteBlogger /> : <AdminLogin />} />


        {/*  moderator routes */}
        <Route path={"mod/login"} element={<ModeratorLogin />} />
        <Route path={"mod/home"} element={isModerator? <ModHome /> : <ModeratorLogin/>} />


      </Route>
    </Routes>
    </>
  );
};

export default AppRoutes;