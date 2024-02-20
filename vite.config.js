import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from "vite-plugin-node-polyfills";
import ogPlugin from 'vite-plugin-open-graph';

const Options = {
  basic: {
    url: 'https://shadylabs.xyz',
    title: 'Shady Labs',
    type: 'image.png',
    image: 'https://shadylabs.xyz/logo.svg',
    determiner: 'auto',
    description: 'Decentralized music streaming platfomr',
    locale: 'zh_CN',
    localeAlternate: ['fr_FR', 'es_ES'],
    siteName: 'Shady Labs',
    audio: {
      url: 'audio url',
      secureUrl: 'audio secure url',
      type: 'video.movie',
    },
    video: 'video meta',
  },
  twitter: {
    image: 'https://shadylabs.xyz/logo.svg',
    imageAlt: 'https://shadylabs.xyz/logo.svg',
    player: 'player',
    playerWidth: 1200,
    playerHeight: 600,
    playerStream: 'player stream',
    app: {
      name: {
        iphone: 'iphone name',
        ipad: 'ipad name',
        googleplay: 'google play name',
      },
      id: {
        iphone: 'iphone url',
        ipad: 'ipad url',
        googleplay: 'google play url',
      },
      url: {
        iphone: 'iphone url',
        ipad: 'ipad url',
        googleplay: 'google play url',
      },
    },
  },
  facebook: {
    appId: 123456,
  },
};

export default defineConfig({
  plugins: [react(), nodePolyfills(), ogPlugin(Options)],
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  }
})