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
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
