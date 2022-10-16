const token = process.env["BEARER_TOKEN"];

export async function search({track, artist, year}){
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
            "Content-Length": "0",
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
            "Content-Length": "0",
            "Authorization": "Bearer " + token,
        }
    });
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