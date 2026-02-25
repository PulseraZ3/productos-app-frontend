import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('rol');
  
  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  
  if(!allowedRoles){
    return true;
  }
  // no hay token 
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (!allowedRoles.includes(role!)) {


    // navegacion de roles
    if (role === 'CLIENTE') {
      router.navigate(['/catalogo']);
    } else if (role === 'ADMIN') {
      router.navigate(['/admin']);
    } else {
      router.navigate(['/catalogo']);
    }

    return false;
  }

  return true;
};