import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.authme.test',
  appName: 'AuthMe',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
