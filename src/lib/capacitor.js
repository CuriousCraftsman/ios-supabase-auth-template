import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';

export async function initializeCapacitor() {
  if (Capacitor.isNativePlatform()) {
    try {
      // Configure status bar to be transparent and overlay content
      await StatusBar.setOverlaysWebView({ overlay: true });
      await StatusBar.setBackgroundColor({ color: 'transparent' });
    } catch (error) {
      console.warn('StatusBar configuration failed:', error);
    }
  }
}