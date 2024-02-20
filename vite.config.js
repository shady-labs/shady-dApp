import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from "vite-plugin-node-polyfills";
import ogPlugin from 'vite-plugin-open-graph';

const Options = {
  basic: {
    url: 'https://shadylabs.xyz',
    title: 'Shady Labs',
    type: 'image.png',
    image: 'https://opengraph.b-cdn.net/production/documents/41b6004f-f595-42a8-bdef-4de3d7033d0c.png?token=WfOkqjl8R7B1gOUXS2FcABlbhcG1sCwPIXmdpay8qB0&height=500&width=500&expires=33244452244',
    determiner: 'auto',
    description: 'Decentralized music streaming platform',
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
    image: 'https://opengraph.b-cdn.net/production/documents/41b6004f-f595-42a8-bdef-4de3d7033d0c.png?token=WfOkqjl8R7B1gOUXS2FcABlbhcG1sCwPIXmdpay8qB0&height=500&width=500&expires=33244452244',
    imageAlt: 'https://opengraph.b-cdn.net/production/documents/41b6004f-f595-42a8-bdef-4de3d7033d0c.png?token=WfOkqjl8R7B1gOUXS2FcABlbhcG1sCwPIXmdpay8qB0&height=500&width=500&expires=33244452244',
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