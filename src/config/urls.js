import config from "./config";

export const url = {
    GET_STAR_REPO : "search/repositories",
    GET_REPO_FREQ: "repos"
}

export const apiUrl = (name) =>{
    return `${config.API_ENDPOINT}${url[name]}`;
}

export const getApiUrl = (path,params) => `${config.API_ENDPOINT}${path}${params}`

export default apiUrl;