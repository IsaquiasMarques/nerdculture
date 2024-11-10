import { Partner } from "@core/models/partner.model";
import { Podcast } from "@core/models/podcast.model";
import { Post, PostCategory } from "@core/models/post.model";
import { TeamMember } from "@core/models/team-members.model";

export class Transformer{

    static partners(incoming: any[]): Partner[]{
        return incoming.flatMap((i: any) => {
            return {
                name: i.partner_name,
                logo: i.partner_logo,
                visible: i.show_in_front
            }
        });
    }

    static members(incoming: any[]): TeamMember[]{
        return incoming.flatMap((i: any) => {
            return {
                name: i.colaborator_name,
                role: i.colaborator_role,
                image: i.colaborator_image,
                facebook: (i.colaborator_facebook_profile.length > 0) ? i.colaborator_facebook_profile : undefined,
                instagram: (i.colaborator_instagram_profile.length > 0) ? i.colaborator_instagram_profile : undefined,
                linkedin: (i.colaborator_linkedin_profile.length > 0) ? i.colaborator_linkedin_profile : undefined
            }
        })
    }

    static podcasts(incoming: any[]): Podcast[]{
        return incoming.map((i: any) => {
            return {
                title: i.title.rendered ?? i.title,
                episode: i.acf.episodio,
                slug: i.slug,
                image: i.acf.imagem,
                status: i.acf.estado,
                highlighted: i.acf.destaque,
                date: i.acf.data,
                starting_at: i.acf.hora_de_inicio,
                ending_at: i.acf.hora_de_fim,
                duration: i.acf.duracao,
                guests: i.acf.visitantes.flatMap((guest: any) => {
                    return {
                        name: guest.nome,
                        social_media: guest.perfil_de_uma_rede_social
                    }
                }),
                description: i.acf.descricao,
                embedded_iframe: i.acf.iframe_incorporado,
                calendar: i.acf.calendario_para_download
            }
        });
    }

    // static advertisements(incoming: any[]): 

    static categories(incoming: any[]): PostCategory[]{
        return incoming.flatMap((i: any) => {
            return {
                name: i.name,
                slug: i.slug,
                count: i.count,
                highlighted: i.acf.destacar_categoria,
                color: i.acf.cor_de_destaque,
                image: (i.acf.com_imagem) ? i.acf.imagem_de_destaque : undefined
            }
        });
    }

    static posts(incoming: any[]): Post[]{
        const FIRST_ITEM = 0;
        return incoming.flatMap((i: any) => {
            return {
                title: i.title.rendered,
                slug: i.slug,
                content: i.content.rendered,
                excerpt: i.excerpt.rendered,
                image: {
                    full: i.images_size_custom.fullImageSize ? i.images_size_custom.fullImageSize : 'assets/static/images/posts/no-image.jpg',
                    medium: i.images_size_custom.mediumImageSize ? i.images_size_custom.mediumImageSize : 'assets/static/images/posts/no-image.jpg',
                    thumbnail: i.images_size_custom.thumbnailImageSize ? i.images_size_custom.thumbnailImageSize : 'assets/static/images/posts/no-image.jpg'
                },
                created_at: i.date,
                author: i._embedded.author[FIRST_ITEM].name,
                categories: Transformer.categories(i.categories)
            }
        })
    }

}