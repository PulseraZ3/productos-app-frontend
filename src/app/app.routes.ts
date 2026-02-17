import { Routes } from '@angular/router';
import { ProductoComponent } from './Components/Productos/producto-create/producto.component';
import { ProductoComponentListar } from './Components/Productos/producto-listar/producto.component';
import { CategoriaList } from './Categoria/categoria-list/categoria-list';
import { DashboardComponent } from './Components/Productos/producto-dashboard/producto-dashboard';
import { MenuComponent } from './Components/Menu/menu-general/menu.component';
import { RegisterComponent } from './Components/register/register';
import { MainLayout } from './Layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'producto/nuevo', component: ProductoComponent },
      { path: 'productos', component: ProductoComponentListar },
      { path: 'categorias', component: CategoriaList },
      { path: 'dashProducto', component: DashboardComponent },
      { path: '', component: MenuComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }

];
