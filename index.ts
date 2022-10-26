import { AppleCSVLine } from "./types/types.ts";
import { USER_URI } from './utils/config.ts';
import parseCSV from "./utils/parseCSV.ts";
import { addToPlaylist, createPlaylist, searchTrack } from "./utils/api.ts";

async function getSongIDfromCSVLine({ Title: track, Artist: artist, Year: year }: AppleCSVLine) { 
    const searchResponse = await searchTrack({ track, artist, year });
    const songData = searchResponse.tracks.items.at(0);

    if (!songData) {
        console.log(`No song found for ${track} by ${artist}`);
        return "";
    }
    return songData.uri;
}

async function main(playlistName: string, playlistDesc: string, csvFileName: string) {
    const appleCSVLines = await parseCSV(csvFileName) as AppleCSVLine[];

    const songIDPromises: Promise<string>[] = [];
    appleCSVLines.forEach((line) => { songIDPromises.push(getSongIDfromCSVLine(line)) });

    const { id: playlistID } = await createPlaylist(playlistName, playlistDesc, USER_URI);

    const songIDs: string[] = (await Promise.all(songIDPromises)).filter(e => e) as string[]; // filter out empty strings

    await addToPlaylist(playlistID, songIDs.join(','));

    console.log(playlistName + " created: spotify://playlist/" + playlistID);
}

main(Deno.args[0], Deno.args[1], './lib_AM.csv');