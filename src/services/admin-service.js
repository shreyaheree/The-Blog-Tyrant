import axios from 'axios'; 

const createCommunity = async (communityName, communityDescription) => {
    const CREATE_COMMUNITY_API = "http://localhost:8080/admin/createcommunity"; 
    const community = {
        communityName : communityName,
        communityDescription : communityDescription
    };
    return await axios.post(CREATE_COMMUNITY_API, community);
   
};

const updateCommunity = async (communityId, communityName, communityDescription) => {
    const UPDATE_COMMUNITY_API = "http://localhost:8080/admin/updatecommunity";
    const community = {
        communityId : communityId,
        communityName : communityName,
        communityDescription : communityDescription
    }

    console.log(community);

    return await axios.post(UPDATE_COMMUNITY_API, community);
}

const fetchAllCommunities = async () => {
    const FETCH_COMMUNITIES_API = "http://localhost:8080/admin/viewallcommunities";
    return await axios.get(FETCH_COMMUNITIES_API);
}

const removeBlogger = async (communityId, bloggerId) => {
    const REMOVE_BLOGGER_API = `http://localhost:8080/admin/${communityId}/removebloggers`;

    const payload = {
        integerList : [bloggerId],
    }


    return await axios.post(REMOVE_BLOGGER_API, payload);
}

const addBlogger = async (communityId, bloggerId) => {
    const ADD_BLOGGER_API = `http://localhost:8080/admin/${communityId}/addbloggers`;

    const payload = {
        integerList : [bloggerId], 
    }

    return await axios.post(ADD_BLOGGER_API , payload);
}

export {createCommunity, updateCommunity, fetchAllCommunities, removeBlogger, addBlogger}