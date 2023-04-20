import axios from 'axios';

const updateUser = async (bloggerId, bloggerName, file) => {
    const UPDATE_BLOGGER_API = 'http://localhost:8080/updateprofile';

    const updatedBlogger = {
        userId : bloggerId,
        bloggerName : bloggerName,
        profilePicture : file
    }

    return axios.post(UPDATE_BLOGGER_API,updatedBlogger);

}

const fetchAllBloggers = async () => {
    const FETCH_BLOGGERS_API = 'http://localhost:8080/fetchallbloggers';

    return axios.get(FETCH_BLOGGERS_API);
};

const promoteBlogger = async (bloggerId) => {
    const PROMOTE_BLOGGER_API = 'http://localhost:8080/admin/assignmoderator?bloggerid='+bloggerId;

    return axios.get(PROMOTE_BLOGGER_API);
}

const getCommunities = async (bloggerId) => {
    const GET_COMMUNITIES_API = 'http://localhost:8080/getcommunities?bloggerid='+bloggerId;

    return axios.get(GET_COMMUNITIES_API);
}

export {updateUser, fetchAllBloggers, promoteBlogger, getCommunities};