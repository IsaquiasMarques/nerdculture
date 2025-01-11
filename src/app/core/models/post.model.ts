export interface PostCategory{
    id: number,
    name: string,
    count: number,
    slug: string,
    highlighted: boolean,
    image?: string,
    color: string,
}

export interface Post{
    id: number,
    title: string,
    slug: string,
    content: string,
    excerpt: string,
    image: {
        full: string,
        large: string,
        medium_large: string,
        medium: string,
        thumbnail: string
    },
    created_at: string,
    categories: PostCategory[],
    author: string,
}