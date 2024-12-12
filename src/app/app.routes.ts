import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/components/container/home/home.component').then(component => component.HomeComponent),
        title: 'Nerd Culture - Página Inicial'
    },
    {
        path: 'podnerd',
        loadComponent: () => import('./pages/podnerd/components/container/podnerd/podnerd.component').then(component => component.PodnerdComponent),
        title: 'Podnerd - Acompanhe os nossos podcasts'
    },
    {
        path: 'contents',
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/contents/components/container/contents.component').then(component => component.ContentsComponent),
                title: 'Conteúdos - Esteja a par dos nossos conteúdos'
            },
            {
                path: 'category/:category',
                loadComponent: () => import('./pages/posts/components/container/posts.component').then(component => component.PostsComponent),
                title: 'Conteúdos - Esteja a par dos nossos conteúdos'
            },
            {
                path: 'article/:slug',
                loadComponent: () => import('./pages/post/components/container/post.component').then(component => component.PostComponent),
                title: 'Conteúdo - Leitura de publicação'
            }
        ]
    },
    {
        path: 'contact-us',
        loadComponent: () => import('./pages/contact-us/components/container/contact-us/contact-us.component').then(component => component.ContactUsComponent),
        title: 'Entre em contacto - Sua opinião nos ajuda a crescer'
    },
    {
        path: 'search',
        loadComponent: () => import('./pages/search/components/containers/search.component').then(component => component.SearchComponent),
        children: [
            {
                path: '',
                redirectTo: '/search/contents',
                pathMatch: 'full'
            },
            {
                path: 'podcasts',
                title: 'Pesquise os podcasts do seu interesse',
                loadComponent: () => import('./pages/search/components/views/podcasts/podcasts.component').then(component => component.PodcastsComponent)
            },
            {
                path: 'contents',
                title: 'Pesquise os conteúdos do seu interesse',
                loadComponent: () => import('./pages/search/components/views/contents/contents.component').then(component => component.ContentsComponent)
            }
        ]
    }
];
