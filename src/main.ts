import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { inject } from '@angular/core';
import { AuthService } from './app/services/auth';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));