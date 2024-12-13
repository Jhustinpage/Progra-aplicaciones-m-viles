import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'RegistrAPP',
  webDir: 'www',
  android: {
    allowMixedContent: true,
    useLegacyBridge: false
  }
};

export default config;


