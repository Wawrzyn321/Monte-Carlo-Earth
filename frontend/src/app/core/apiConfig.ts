import { InjectionToken } from '@angular/core';

export interface ApiConfig {
    pointsUrl: string;
    geocodingUrl: string;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('apiConfig');
