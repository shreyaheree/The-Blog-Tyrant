import React, { useContext, useEffect, useState } from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import PostList from "../../components/postList/PostList";
import Loader from "../../components/loader/Loader.tsx";
import { fetchAllPosts } from "../../services/post-service";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  //use hooks to fetch posts and loading status;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const {isAdmin} = useContext(AuthContext);
  // console.log(isAdmin);

  useEffect(() => {
    async function getPosts() {
      setPosts(await fetchAllPosts());
      setIsLoading(false);
    }
    getPosts();
  }, []);

  const error = null;

  return (
    <div className={"home"}>
      <div className={"homePosts"}>
        {isLoading && <Loader />}
        {posts.length !== 0 ? (
          <PostList error={error} posts={posts} />
        ) : (
          "Home Page"
        )}
      </div>
    </div>
  );
};

export default Home;
