import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export function requestInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  const newReq = req.clone({
    url: `${environment.apiBaseUrl}${req.url}`,
  });
  return next(newReq);
}
