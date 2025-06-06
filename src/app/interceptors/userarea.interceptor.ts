import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const userareaInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = inject(CookieService)
  if (cookie.get('userToken')) {
    const auth = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${cookie.get('userToken')}`)
    })
    return next(auth);
  } else {
    return next(req)
  }
};
