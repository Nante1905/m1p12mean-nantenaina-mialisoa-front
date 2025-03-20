import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export function requestInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // const messageService = inject(MessageService);
  // console.log('messageService', messageService);

  // messageService.add({
  //   severity: 'info',
  //   summary: 'Request',
  //   detail: req.url,
  // });
  const token = localStorage.getItem('access');
  const newReq = req.clone({
    url: `${environment.apiBaseUrl}${req.url}`,
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(newReq);
}
