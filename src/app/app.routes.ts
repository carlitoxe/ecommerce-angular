import { Routes } from '@angular/router';

// import { ListComponent } from '@products/pages/list/list.component'
// import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component'
// import { AboutComponent } from '@info/pages/about/about.component'
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@products/pages/list/list.component')
      },
      {
        path: 'about',
        loadComponent: () => import('@info/pages/about/about.component')
      },
      {
        path: 'product/:id',
        loadComponent: () => import('@products/pages/product-detail/product-detail.component')
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
