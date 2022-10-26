export default interface apiCreatePlaylistResonse {
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
  
  export interface ExternalUrls {
    spotify: string
  }
  
  export interface Followers {
    href: any
    total: number
  }
  
  export interface Owner {
    display_name: string
    external_urls: ExternalUrls2
    href: string
    id: string
    type: string
    uri: string
  }
  
  export interface ExternalUrls2 {
    spotify: string
  }
  
  export interface Tracks {
    href: string
    items: any[]
    limit: number
    next: any
    offset: number
    previous: any
    total: number
  }
  