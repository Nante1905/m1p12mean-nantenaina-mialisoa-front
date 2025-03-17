import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { requestInterceptor } from './shared/services/request.interceptor';
import { AppPreset } from './themePreset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([requestInterceptor])),
    providePrimeNG({
      theme: {
        preset: AppPreset,
      },
    }),
    MessageService,
  ],
};
