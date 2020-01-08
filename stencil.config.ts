import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'videoplayer',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  bundles: [
    { components: [
      'video-player',
      'play-button',
      'mute-button',
      'fullscreen-button',
      'scrub-bar',
      'volume-bar',
      'time-label',
      'control-bar',
      'thumbnail-preview',
      'subtitles-button',
      'cues-box'
    ] }
  ]
};

