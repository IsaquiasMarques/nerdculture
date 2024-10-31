export interface PostCategory{
    name: string,
    count: number,
    slug: string,
    highlighted: boolean,
    image?: string,
    color: string,
}

export interface Post{
    title: string,
    slug: string,
    content: string,
    excerpt: string,
    image: {
        full: string,
        medium: string,
        thumbnail: string
    },
    created_at: string,
    categories: PostCategory[],
    author: string,
}