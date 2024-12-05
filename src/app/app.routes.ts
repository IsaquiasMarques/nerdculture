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
];
