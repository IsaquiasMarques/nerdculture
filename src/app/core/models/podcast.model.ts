import { PodcastStatus } from "@core/enums/podcast-status.enum";

export interface Podcast{
    title: string,
    episode: string,
    slug: string,
    image: string,
    status: PodcastStatus,
    highlighted: boolean,
    date?: string,
    starting_at?: string,
    ending_at?: string,
    duration: string,
    guests: PodcastGuest[],
    description: string,
    embedded_iframe?: string,
    calendar?: string
}

export interface PodcastGuest{
    name: string,
    social_media?: string
}