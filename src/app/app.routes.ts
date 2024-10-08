import { Routes } from '@angular/router';
import { ContentsComponent } from '@contents/components/container/contents/contents.component';
import { HomeComponent } from '@home/components/container/home/home.component';
import { PodnerdComponent } from '@podnerd/components/container/podnerd/podnerd.component';
import { PostComponent } from '@post/components/container/post/post.component';
import { PostsComponent } from '@posts/components/container/posts/posts.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Nerd Culture - Página Inicial'
    },
    {
        path: 'podnerd',
        component: PodnerdComponent,
        title: 'Podnerd - Acompanhe os nossos podcasts'
    },
    {
        path: 'contents',
        component: ContentsComponent,
        title: 'Conteúdos - Esteja a par dos nossos conteúdos'
    },
    {
        path: 'posts/:category',
        component: PostsComponent,
        title: 'Conteúdos - Esteja a par dos nossos conteúdos'
    },
    {
        path: 'post/:slug',
        component: PostComponent,
        title: 'Conteúdo - Leitura de publicação'
    }
];
