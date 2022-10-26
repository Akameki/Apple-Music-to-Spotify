import { TOKEN } from "./config.ts";
import { SearchQuery } from "../types/types.ts";
import { SearchResp, Playlist as PlaylistResp } from "../types/spotifyApiTypes.ts";

export async function searchTrack({ track, artist, year }: SearchQuery): Promise<SearchResp> {
    //TODO: use year in search
    const BASE_URL = 'https://api.spotify.com/v1/search/';
    const params = new URLSearchParams({
        q: `track:${track} artist:${artist}`,
        type: 'track',
        limit: '1',
    });
    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + TOKEN
        }
    });

    if (!response.ok) throw new Error(response.statusText);
    return await response.json();

}

export async function createPlaylist(name = "blank name", description = "blank desc", userID: string): Promise<PlaylistResp> {
    const BASE_URL = `https://api.spotify.com/v1/users/${userID}/playlists`;
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Content-Length": "0",
            "Authorization": "Bearer " + TOKEN
        }, 
        body: JSON.stringify({
            name,
            description,
            "public": false
        })
    });

    if (!response.ok) throw new Error(response.statusText);
    return await response.json() as PlaylistResp;  
}

export async function addToPlaylist(playlistID: string, uris: string){
    const BASE_URL = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    const params = new URLSearchParams({ uris });
    
    const response = await fetch(`${BASE_URL}?${params.toString()}`,{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + TOKEN,
        }
    });

    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}