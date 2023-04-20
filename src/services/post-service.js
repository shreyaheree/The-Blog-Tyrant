import axios from "axios";

const createPost = async (file, title, description, bloggerId) => {
  const CREATE_POST_API = `http://localhost:8080/${bloggerId}/createpost`;

  const payload = {
    title: title,
    data: description,
    notSafeForWork: false,
    spoiler: false,
    originalContent: true,
    shadow: false,
    postImage: file,
  };

  const response = await axios.post(CREATE_POST_API, payload);

  return response;
};

const updatePost = async (postId, file, title, description, bloggerId) => {
  const CREATE_POST_API = `http://localhost:8080/${bloggerId}/${postId}/editpost`;

  console.log(file);

  const payload = {
    postId: postId,
    title: title,
    data: description,
    notSafeForWork: false,
    spoiler: false,
    originalContent: true,
    shadow: false,
    postImage: file,
  };

  const response = await axios.post(CREATE_POST_API, payload);

  return response;
};

const fetchPostsByType = async (postsType) => {
  const FETCH_POSTS_API =
    "http://localhost:8080/fetchallposts?sortby=" + postsType;

  const response = await axios.get(FETCH_POSTS_API);

  const FETCH_BLOGOWNER_API = `http://localhost:8080/findBlogOwner/`;

  let postList = [];
  let i;
  for (i of response.data) {
    const bloggerResponse = await axios.get(FETCH_BLOGOWNER_API + i.postId);
    const commentResponse = await fetchPostComments(i.postId);

    i.user = bloggerResponse.data;
    i.comments = commentResponse.data;
    postList = [...postList, i];
  }

  return postList;
};

const fetchAllPosts = async () => {
  const FETCH_POST_API = "http://localhost:8080/fetchAllPosts";
  const response = await axios.get(FETCH_POST_API);

  const FETCH_BLOGOWNER_API = `http://localhost:8080/findBlogOwner/`;

  let postList = [];
  let i;
  for (i of response.data) {
    const bloggerResponse = await axios.get(FETCH_BLOGOWNER_API + i.postId);
    const commentResponse = await fetchPostComments(i.postId);

    i.user = bloggerResponse.data;
    i.comments = commentResponse.data;
    postList = [...postList, i];
  }

  return postList;
};

const findById = async (postId) => {
  const FETCH_POST_API = "http://localhost:8080/findPostById/" + postId;
  const response = await axios.get(FETCH_POST_API);

  const commentResponse = await fetchPostComments(postId);

  const FETCH_BLOGOWNER_API = `http://localhost:8080/findBlogOwner/`;
  const bloggerResponse = await axios.get(FETCH_BLOGOWNER_API + postId);

  let post = response.data;
  post.comments = commentResponse.data;
  post.user = bloggerResponse.data;

  return post;
};

const fetchPostComments = async (postId) => {
  const FETCH_COMMENT_API = "http://localhost:8080/fetchPostComments/" + postId;
  const commentResponse = await axios.get(FETCH_COMMENT_API);

  return commentResponse;
};

const upvotePost = async (bloggerId, postId) => {
  const UPVOTE_POST_API = `http://localhost:8080/${bloggerId}/${postId}/voteup`;
  const response = await axios.get(UPVOTE_POST_API);

  const FETCH_UPVOTERS_API = `http://localhost:8080/findblogger/`;
  const bloggerResponse = await axios.get(FETCH_UPVOTERS_API + bloggerId);

  return bloggerResponse;
};

const deletePost = async (postId) => {
  const DELETE_POST_API = `http://localhost:8080/${postId}/deletepost`;
  return axios.get(DELETE_POST_API);
};

const createComment = async (text, postId, bloggerId) => {
  const CREATE_COMMENT_API = `http://localhost:8080/${bloggerId}/${postId}/addcomment`;
  const comment = {
    commentDescription: text,
  };
  return await axios.post(CREATE_COMMENT_API, comment);
};

const getPostByUserId = async (bloggerId) => {
  const GET_POST_API = "http://localhost:8080/bloggerposts/" + bloggerId;

  const response = await axios.get(GET_POST_API);

  const FETCH_BLOGOWNER_API = `http://localhost:8080/findBlogOwner/`;

  let postList = [];
  let i;
  for (i of response.data) {
    const bloggerResponse = await axios.get(FETCH_BLOGOWNER_API + i.postId);
    const commentResponse = await fetchPostComments(i.postId);

    i.user = bloggerResponse.data;
    i.comments = commentResponse.data;
    postList = [...postList, i];
  }

  return postList;
};

const shadowPost = async (postId) => {
  const SHADOW_POST_API =
    "http://localhost:8080/mod/shadowpost?postid=" + postId;
  return await axios.get(SHADOW_POST_API);
};

export {
  createPost,
  updatePost,
  fetchAllPosts,
  findById,
  deletePost,
  createComment,
  upvotePost,
  getPostByUserId,
  shadowPost,
  fetchPostsByType,
};
