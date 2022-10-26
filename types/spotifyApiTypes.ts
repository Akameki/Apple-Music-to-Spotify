interface Item {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: Externalids;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}
interface Externalids {
    isrc: string;
}
interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}
interface Image {
    height: number;
    url: string;
    width: number;
}

interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface ExternalUrls {
    spotify: string;
}
interface Followers {
    href: any
    total: number
}
interface Owner {
    display_name: string
    external_urls: ExternalUrls
    href: string
    id: string
    type: string
    uri: string
}
interface Tracks {
    href: string;
    items: Item[];
    limit: number;
    next?: any;
    offset: number;
    previous?: any;
    total: number;
}

export interface SearchResp {
    tracks: Tracks;
    // artists: Artists;
    // albums: Albums;
    // playlists: Playlists;
    // shows: Shows;
    // episodes: Episodes;
    // audiobooks: Audiobooks;
}

export interface Playlist {
    collaborative: boolean
    description: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: any[]
    name: string
    owner: Owner
    primary_color: any
    public: boolean
    snapshot_id: string
    tracks: Tracks
    type: string
    uri: string
}