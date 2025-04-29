import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from './pages/home';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/katalog',
    component: lazy(() => import('./pages/katalog')),
  },
  {
    path: '/produk',
    component: lazy(() => import('./pages/produk')),
  },
  {
    path: '/terbaru',
    component: lazy(() => import('./pages/terbaru')),
  },
  {
    path: '/katalogpria',
    component: lazy(() => import('./pages/katalog-pria')),
  },
  {
    path: '/katalogwanita',
    component: lazy(() => import('./pages/katalog-wanita')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
