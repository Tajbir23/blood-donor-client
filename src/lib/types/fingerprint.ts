/**
 * Interface for device fingerprint data
 */
export interface FingerprintData {
    visitorId: string;
    userAgent: string;
    language: string;
    colorDepth: number;
    deviceMemory?: number;
    hardwareConcurrency?: number;
    screenResolution: number[];
    availableScreenResolution: number[];
    timezoneOffset: number;
    timezone: string;
    sessionStorage: boolean;
    localStorage: boolean;
    indexedDb: boolean;
    cpuClass?: string;
    platform: string;
    plugins: string[];
    canvas: string;
    webgl: string;
    webglVendorAndRenderer: string;
    adBlockUsed: boolean;
    fonts: string[];
    audio: string;
    deviceId?: string;
  }