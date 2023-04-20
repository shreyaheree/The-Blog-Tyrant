import React, { useContext, useEffect, useState } from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import PostList from "../../components/postList/PostList";
import Loader from "../../components/loader/Loader.tsx";
import { fetchAllPosts, fetchPostsByType } from "../../services/post-service";
import { AuthContext } from "../../context/AuthContext";
import BloggerList from "../../components/bloggerList/BloggerList";

const Home = () => {
  //use hooks to fetch posts and loading status;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { postsType } = useContext(AuthContext);

  //   useEffect(() => {
  //     async function getPosts() {
  //       setPosts(await fetchAllPosts());
  //       setIsLoading(false);
  //     }
  //     getPosts();
  //   }, []);

  useEffect(() => {
    const fetchByType = async () => {
      setPosts(await fetchPostsByType(postsType));
      setIsLoading(false);
    };
    fetchByType();
  }, [postsType]);

  const error = null;

  return (
    <div className={"home"}>
      <Sidebar homePage={true} />
      <div className={"homePosts"}>
        {isLoading && <Loader />}
        {posts.length !== 0 ? (
          <PostList error={error} posts={posts} />
        ) : (
          "No posts here yet"
        )}
      </div>

      <div className={"latestWrapper"}>
        <div className={"latestList"}>
          <div className={"latestTitle"}>
            <h3>Bloggers</h3>
          </div>
          <div className={"latestItems"}>
            <BloggerList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
