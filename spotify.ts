import type dataInfo from "./types/dataInfo.ts";
import csvParse from "./utils/csv-parse.ts";
import {dotEnvConfig} from './deps.ts';
import { addToPlaylist, createPlaylist, search } from "./utils/api.ts";
import type apiSearchResponse from "./types/apiSearchResponse.ts";
import type apiCreatePlaylistResonse from "./types/apiCreatePlaylistResonse.ts";

// TODO: move this to api.ts
const user_uri = dotEnvConfig().USER_ID
if (user_uri === undefined) {
    throw new Error('USER_ID not set');
}

async function extractData(item: dataInfo) { 
    const info = await search({
        track: item.Title,
        artist: item.Artist,
        year: item.Year,
    }) as apiSearchResponse;
    if (!info.tracks.items.length){
        console.log(`Not Found: ${item.Title}`);
    } else {
        const songData = info.tracks.items.at(0);
        return songData!.uri;
    }
    
}

async function main() {

    let songIDs:(string | undefined)[] = [];

    const songIDPromises:Promise<string | undefined>[] = [];

    const songs = await csvParse('./lib_AM.csv') as dataInfo[];

    for (const item of songs){
        songIDPromises.push(extractData(item));
        // @ts-ignore
        // songIDs.push(songData.uri);
    }
    let ret = await createPlaylist('New Playlist (1)', user_uri) as unknown as apiCreatePlaylistResonse;
    console.log(ret);
    
    let {uri: playlistID} = ret;
    playlistID = playlistID.split(':').at(2) as string;
    songIDs = await Promise.all(songIDPromises);
    const response = await addToPlaylist(playlistID,songIDs.join(','));
    console.log(response)
}

main()