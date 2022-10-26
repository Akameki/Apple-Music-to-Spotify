import {dotEnvConfig} from '../deps.ts';

const token = dotEnvConfig().BEARER_TOKEN;

import searchObj from "../types/searchObj.ts";

export async function search({track, artist, year}: searchObj){
    //TODO: use year in search
    const BASE_URL = 'https://api.spotify.com/v1/search/';
    const params = new URLSearchParams({
        // q: encodeURI(`track:${track} artist:${artist}`),
        q: `track:${track} artist:${artist}`,
        type: 'track',
    });
    const API_URL = BASE_URL + '?' + params.toString();
    const response = await fetch(API_URL, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });
    if (response.ok) {
        return await response.json();   
    }
    else {
        return response.statusText;
    }
};

export async function addToPlaylist(playlist_id: string, uris: string){
    
    const BASE_URL = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
    const params = new URLSearchParams({
        uris
    });
    const API_URL = BASE_URL + '?' + params.toString();
    
    console.log(API_URL);
    
    const response = await fetch(API_URL,{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    });
    

    // const response = await fetch2("https://api.spotify.com/v1/playlists/3Qow5iHDL82Ey0Og9LUTaS/tracks?uris=spotify%3Atrack%3A1eT2CjXwFXNx6oY5ydvzKU%2Cspotify%3Atrack%3A0wwPcA6wtMf6HUMpIRdeP7%2Cspotify%3Atrack%3A5xTtaWoae3wi06K5WfVUUH", {
    //     "headers": {
    //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
    //         "Accept": "*/*",
    //         "Accept-Language": "en-US,en;q=0.5",
    //         "Authorization": "Bearer BQBIS_mgovqhi__1w22o6k-aicYEVLqjvb27XDYngVaB2hItdBXHeWe-qr57dxPCHjk6Up1UigJL30nk-12q6PjS-TbXUOQ9wlbZ5cca4UZqS_Exx6d3m9Qz0Qyi0_QA-2GSmBb_LekqRtU3cKfbDkiaH66-8aq_Jj8D-QShlTNn0OMmGOj3cfXcr79Yc3XtkXVp0KSvLee3gSdYuEMGtrOYIB2oG8ZKpOqBhgVxSsNkJnzO5K07ROkVmLK0n8I_",
    //         "content-length": "0",
    //         "Content-Length": "0",
    //     },
    //     "referrer": "https://developer.spotify.com/",
    //     "method": "POST",
    // });

    if (response.ok) {
        return await response.json();   
    }
    else {
        return response;
    }
}

// export async function addToPlaylist(playlist_id: string, uris: string){
//     var url = "https://api.spotify.com/v1/playlists/3Qow5iHDL82Ey0Og9LUTaS/tracks?uris=spotify%3Atrack%3A1eT2CjXwFXNx6oY5ydvzKU%2Cspotify%3Atrack%3A0wwPcA6wtMf6HUMpIRdeP7%2Cspotify%3Atrack%3A5xTtaWoae3wi06K5WfVUUH";

// var xhr = new XMLHttpRequest();
// xhr.open("POST", url);

// xhr.setRequestHeader("Authorization", "Bearer BQAkoBJk6ECfG-8uZ7Q8tgaotcY3SEiEWY-UurvjfSaYPRkIkrBxbZETx819-17RoT0bZao-VRPQ1QJ9HBOcFU6CaaFVgWwXibBzyIqhuxsLn9yJZry3-JUtTZ33TyO4rEfyzRG8O-29ohe5ZzWNuSoA8REgGTTupOJZy9VhHQrLLlkIkkeHV0fTdXd1XId5URJxyileyvFojKPMZ0fqOT6-GUHMoaTS8zdl2OBNNUqjlKmLhF1FLOpLKLTqqwWb");
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.setRequestHeader("Content-Length", "0");

// xhr.onreadystatechange = function () {
//    if (xhr.readyState === 4) {
//       console.log(xhr.status);
//       console.log(xhr.responseText);
//    }};

// xhr.send();
// }

export async function createPlaylist(name: string, user_id: string) {
    const BASE_URL = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    const params = new URLSearchParams({
        name
    });
    const API_URL = BASE_URL + '?' + params.toString();
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Content-Length": "0",
            "Authorization": "Bearer " + Deno.env.get("BEARER_TOKEN_PLAYLIST")
        }
    });
    if (response.ok) {
        return await response.json();   
    }
    else {
        return response.statusText;
    }
}

// async function t() {
//     console.log("hi");
    
//     const response = await fetch("https://api.spotify.com/v1/playlists/3Qow5iHDL82Ey0Og9LUTaS/tracks?uris=spotify%3Atrack%3A1eT2CjXwFXNx6oY5ydvzKU%2Cspotify%3Atrack%3A0wwPcA6wtMf6HUMpIRdeP7%2Cspotify%3Atrack%3A5xTtaWoae3wi06K5WfVUUH", {
//         "headers": {
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
//             "Accept": "*/*",
//             "Accept-Language": "en-US,en;q=0.5",
//             "Authorization": "Bearer BQBIS_mgovqhi__1w22o6k-aicYEVLqjvb27XDYngVaB2hItdBXHeWe-qr57dxPCHjk6Up1UigJL30nk-12q6PjS-TbXUOQ9wlbZ5cca4UZqS_Exx6d3m9Qz0Qyi0_QA-2GSmBb_LekqRtU3cKfbDkiaH66-8aq_Jj8D-QShlTNn0OMmGOj3cfXcr79Yc3XtkXVp0KSvLee3gSdYuEMGtrOYIB2oG8ZKpOqBhgVxSsNkJnzO5K07ROkVmLK0n8I_",
//             "Sec-Fetch-Dest": "empty",
//             "Sec-Fetch-Mode": "cors",
//             "Sec-Fetch-Site": "same-site",
//             "Content-Length": "0"
//         },
//         "referrer": "https://developer.spotify.com/",
//         "method": "POST",
//     });
//     console.log(response)
//     if (response.ok) {
//         return await response.json();   
//     } else {
//         console.log(response);
//     }
//     console.log(response);

// }
// t();