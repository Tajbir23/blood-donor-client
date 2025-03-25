'use client';

import { FingerprintData } from '@/lib/types/fingerprint';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';



/**
 * Generates a fingerprint hash from device and browser data
 * This helps identify unique users even if they delete cookies
 */
const generateFingerprint = async (): Promise<FingerprintData> => {
  // Generate or retrieve a persistent device ID
  let deviceId: string | null = null;
  
  try {
    deviceId = window.localStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = uuidv4();
      window.localStorage.setItem('device_id', deviceId);
    }
  } catch {
    deviceId = uuidv4(); // Fallback if localStorage is not available
  }

  // Basic browser information
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const colorDepth = window.screen.colorDepth;
  const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 0;
  const hardwareConcurrency = navigator.hardwareConcurrency || 0;
  const screenResolution = [window.screen.width, window.screen.height];
  const availableScreenResolution = [
    window.screen.availWidth,
    window.screen.availHeight,
  ];
  const timezoneOffset = new Date().getTimezoneOffset();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const sessionStorage = !!window.sessionStorage;
  const localStorage = !!window.localStorage;
  const indexedDb = !!window.indexedDB;
  const cpuClass = (navigator as unknown as { cpuClass?: string }).cpuClass;
  const platform = navigator.platform;

  // Plugin detection
  const plugins: string[] = [];
  for (let i = 0; i < navigator.plugins.length; i++) {
    plugins.push(navigator.plugins[i].name);
  }

  // Canvas fingerprinting
  const canvas = await getCanvasFingerprint();

  // WebGL fingerprinting
  const webglData = getWebglFingerprint();
  const webgl = webglData.webgl;
  const webglVendorAndRenderer = webglData.webglVendorAndRenderer;

  // Ad blocker detection
  const adBlockUsed = await checkAdBlocker();

  // Font detection
  const fonts = await detectFonts();

  // Audio fingerprinting
  const audio = await getAudioFingerprint();

  // Create a visitor ID by hashing all values
  const allValues = JSON.stringify({
    userAgent,
    language,
    colorDepth,
    deviceMemory,
    hardwareConcurrency,
    screenResolution,
    availableScreenResolution,
    timezoneOffset,
    timezone,
    platform,
    canvas,
    webgl,
    plugins: plugins.join(','),
    fonts: fonts.join(','),
    audio,
  });

  const visitorId = await hashString(allValues);

  return {
    visitorId,
    userAgent,
    language,
    colorDepth,
    deviceMemory,
    hardwareConcurrency,
    screenResolution,
    availableScreenResolution,
    timezoneOffset,
    timezone,
    sessionStorage,
    localStorage,
    indexedDb,
    cpuClass,
    platform,
    plugins,
    canvas,
    webgl,
    webglVendorAndRenderer,
    adBlockUsed,
    fonts,
    audio,
    deviceId,
  };
};

/**
 * Generate a hash from a string
 */
const hashString = async (text: string): Promise<string> => {
  try {
    // Check if crypto.subtle is available (secure contexts/HTTPS only)
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } else {
      // Fallback for environments where crypto.subtle is not available
      return fallbackHash(text);
    }
  } catch (error) {
    console.error('Error using crypto.subtle, falling back to simple hash', error);
    return fallbackHash(text);
  }
};

/**
 * Simple fallback hash function for environments without crypto.subtle
 * Not as secure but provides a consistent fingerprint
 */
const fallbackHash = (str: string): string => {
  let hash = 0;
  if (str.length === 0) return hash.toString(16);
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Add complexity with additional operations
  let result = Math.abs(hash).toString(16);
  
  // Pad to ensure consistent length
  while (result.length < 32) {
    result += Math.abs(hash ^ result.length).toString(16);
  }
  
  return result.slice(0, 32); // Ensure 32 character output like SHA-256
};

/**
 * Canvas fingerprinting
 */
const getCanvasFingerprint = async (): Promise<string> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Draw various shapes and text
  canvas.width = 240;
  canvas.height = 140;
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#f60';
  ctx.fillRect(100, 1, 62, 20);
  ctx.fillStyle = '#069';
  ctx.font = '11pt Arial';
  ctx.fillText('Fingerprinting', 2, 15);
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
  ctx.font = '18pt Arial';
  ctx.fillText('Fingerprint', 4, 45);
  
  // Add a gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(0.5, 'green');
  gradient.addColorStop(1.0, 'blue');
  ctx.fillStyle = gradient;
  ctx.fillRect(10, 60, 100, 50);
  
  // Add an arc
  ctx.arc(50, 70, 30, 0, Math.PI * 2, true);
  ctx.stroke();

  return canvas.toDataURL();
};

/**
 * WebGL fingerprinting
 */
const getWebglFingerprint = () => {
  const canvas = document.createElement('canvas');
  // Type assertion for WebGL context
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
  
  if (!gl) {
    return {
      webgl: '',
      webglVendorAndRenderer: '',
    };
  }

  let webglVendorAndRenderer = '';
  
  try {
    // Get webgl vendor and renderer
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    
    if (debugInfo) {
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      webglVendorAndRenderer = `${vendor}~${renderer}`;
    }

    // Draw a complex scene
    canvas.width = 100;
    canvas.height = 100;
    
    // Clear the canvas
    gl.clearColor(0.2, 0.3, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  } catch (e) {
    console.error('WebGL fingerprinting error:', e);
  }
  
  // Return the full info
  return {
    webgl: canvas.toDataURL(),
    webglVendorAndRenderer,
  };
};

/**
 * Check if an ad blocker is present
 */
const checkAdBlocker = async (): Promise<boolean> => {
  const testDiv = document.createElement('div');
  testDiv.innerHTML = '&nbsp;';
  testDiv.className = 'adsbox';
  testDiv.style.cssText = 'position: absolute; left: -999px; top: -999px;';
  document.body.appendChild(testDiv);

  return new Promise(resolve => {
    setTimeout(() => {
      const isBlocked = testDiv.offsetHeight === 0;
      document.body.removeChild(testDiv);
      resolve(isBlocked);
    }, 100);
  });
};

/**
 * Detect available fonts
 */
const detectFonts = async (): Promise<string[]> => {
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const fontsList = [
    'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Bookman Old Style',
    'Bradley Hand', 'Century', 'Century Gothic', 'Comic Sans MS', 'Courier',
    'Courier New', 'Georgia', 'Helvetica', 'Impact', 'Lucida Console',
    'Lucida Handwriting', 'Lucida Sans', 'Tahoma', 'Times', 'Times New Roman',
    'Trebuchet MS', 'Verdana', 'SutonnyMJ', 'Kalpurush', 'Siyam Rupali',
  ];
  
  const testString = 'mmmmmmmmmmlli';
  const testSize = '72px';
  const h = document.getElementsByTagName('body')[0];
  
  // Create a span to test fonts
  const s = document.createElement('span');
  s.style.fontSize = testSize;
  s.innerHTML = testString;
  const defaultWidth: Record<string, number> = {};
  const defaultHeight: Record<string, number> = {};
  
  // Get the default width and height for the three base fonts
  for (const baseFont of baseFonts) {
    s.style.fontFamily = baseFont;
    h.appendChild(s);
    defaultWidth[baseFont] = s.offsetWidth;
    defaultHeight[baseFont] = s.offsetHeight;
    h.removeChild(s);
  }
  
  // Check if a font is available
  const detect = (font: string) => {
    const detected: string[] = [];
    for (const baseFont of baseFonts) {
      s.style.fontFamily = font + ',' + baseFont;
      h.appendChild(s);
      const match = s.offsetWidth !== defaultWidth[baseFont] || 
                   s.offsetHeight !== defaultHeight[baseFont];
      h.removeChild(s);
      if (match) {
        detected.push(baseFont);
      }
    }
    return detected.length > 0;
  };
  
  const available: string[] = [];
  for (let i = 0; i < fontsList.length; i++) {
    if (detect(fontsList[i])) {
      available.push(fontsList[i]);
    }
  }
  
  return available;
};

/**
 * Audio fingerprinting
 */
const getAudioFingerprint = async (): Promise<string> => {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext?: AudioContext }).webkitAudioContext;
    if (!AudioContext) return '';
    
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const oscillator = audioContext.createOscillator();
    const dynamicsCompressor = audioContext.createDynamicsCompressor();
    
    // Configure components
    analyser.fftSize = 1024;
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(10000, audioContext.currentTime);
    
    // Set dynamics compressor parameters
    dynamicsCompressor.threshold.setValueAtTime(-50, audioContext.currentTime);
    dynamicsCompressor.knee.setValueAtTime(40, audioContext.currentTime);
    dynamicsCompressor.ratio.setValueAtTime(12, audioContext.currentTime);
    dynamicsCompressor.attack.setValueAtTime(0, audioContext.currentTime);
    dynamicsCompressor.release.setValueAtTime(0.25, audioContext.currentTime);
    
    // Connect the audio nodes
    oscillator.connect(dynamicsCompressor);
    dynamicsCompressor.connect(analyser);
    analyser.connect(audioContext.destination);
    
    // Start the oscillator
    oscillator.start(0);
    
    // Get the frequency data
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    
    // Stop the oscillator and close the context
    oscillator.stop(0);
    audioContext.close();
    
    // Convert to a string and return
    return Array.from(dataArray).join(',');
  } catch (e) {
    console.error('Audio fingerprinting error:', e);
    return '';
  }
};

/**
 * Hook to get and use fingerprint data
 */
export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<FingerprintData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFingerprintData = async () => {
      try {
        const data = await generateFingerprint();
        setFingerprint(data);
      } catch (error) {
        console.error('Error generating fingerprint:', error);
      } finally {
        setLoading(false);
      }
    };

    getFingerprintData();
  }, []);

  return { fingerprint, loading };
};
