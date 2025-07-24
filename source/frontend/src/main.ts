import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

// Log environment info on startup
console.log('🚀 Starting CMS Frontend Application');
console.log('📊 Environment:', environment.production ? 'PRODUCTION' : 'DEVELOPMENT');
console.log('🌐 API URL:', environment.apiUrl);
console.log('🔧 Build Time:', new Date().toISOString());

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); 