import { Routes } from '@angular/router';
import { ProductoComponent } from './Components/Productos/producto-create/producto.component';
import { ProductoComponentListar } from './Components/Productos/producto-listar/producto.component';
import { CategoriaList } from './Categoria/categoria-list/categoria-list';
import { DashboardComponent } from './Components/Productos/producto-dashboard/producto-dashboard';
import { MenuComponent } from './Components/Menu/menu-general/menu.component';
import { RegisterComponent } from './Components/register/register';
import { MainLayout } from './Layout/main-layout/main-layout';
import { LoginComponent } from './Components/login/login'
import { CatalogoLayout } from './Layout/catalogo-layout/catalogo-layout/catalogo-layout';
import { ProductosPorCategoriaComponent } from './Components/catalogo/producto-card/productos-por-categoria-component/productos-por-categoria-component';
import { ProductoDetalleComponent } from './Components/Productos/producto-detalle/producto-detalle.component';

import { ProductoImagen } from './Components/Productos/producto-imagen/producto-imagen';
export const routes: Routes = [
  {
    path: 'admin',
    component: MainLayout,
    children: [
      { path: 'producto/nuevo', component: ProductoComponent },
      { path: 'productos', component: ProductoComponentListar },
      { path: 'categorias', component: CategoriaList },
      { path: 'dashProducto', component: DashboardComponent },
      {
        path: 'producto/:id/imagenes',
        component: ProductoImagen
      },
      { path: '', component: MenuComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: "catalogo",
    component: CatalogoLayout,
    children:[ 
      {path:'', component:CategoriaList},
      {path:'categoria/:id', component: ProductosPorCategoriaComponent},
      { path:'producto/:id', component: ProductoDetalleComponent } 
    ]
  },
  { path: '**', redirectTo: 'catalogo' }
];
