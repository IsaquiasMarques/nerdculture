export type AdvertisementLevel = 'level-0' | 'level-1' | 'level-2';

export enum AdvertisementPage{
    PODNERD = 'podnerd',
    BLOG = 'blog',
    BLOG_CATEGORY = 'blog-category',
    READING = 'reading'
}

export interface AdvertisementContent{
    advertiser: string,
    imagePath: string,
    redirectTo: string,
    position: AdvertisementLevel,
    visible: boolean
}

export interface Advertisement{
    page: AdvertisementPage,
    contents: AdvertisementContent[]
}