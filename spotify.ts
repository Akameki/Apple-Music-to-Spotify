import type dataInfo from "./types/dataInfo";
import csvParse from "./utils/csv-parse";
import { addToPlaylist, search } from "./utils/api";
import apiSearchResponse from "./types/apiSearchResponse";


const songs = csvParse('./test-csv.csv') as dataInfo[];


async function main() {
    const songIDs:string[] = [];
    for (const item of songs) {
        const info = await search({
            track: item.trackName,
            artist: item.artist,
            year: item.year,
        }) as apiSearchResponse;
        if (!info.tracks.items.length){
            console.log(`Not Found: ${item.trackName}`);
            continue;
        }
        const songData = info.tracks.items.at(0);
        songIDs.push(songData.uri);
    };
    const response = await addToPlaylist('3Qow5iHDL82Ey0Og9LUTaS',songIDs.join(','));
    console.log(response)
}

main()