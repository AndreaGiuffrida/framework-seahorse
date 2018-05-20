'use strict';

// CSS
import '../css/app.scss';

import 'gsap';
import 'lodash';
import 'fastdom';
import domready from 'domready';
import WebFontLoader from './seahorse/helpers/WebFontLoader';
import Application from './application/Main';

import Seahorse from './seahorse/core/Core';

domready(() => {

  const APP_CONFIG = {

    debug: process.env.NODE_ENV == 'development',

    // Add COUNTRY_CODE to URL
    multilanguage: false,

    // Application name
    name: 'Seahorse Development',

    // Application version
    version: '1.0',

    // Global resize event
    resize: true,

    // Global scroll event
    scroll: false,

    // Global mobile events
    mobile: true,

    // WebGL config
    webgl: {

      transparent: true,

      antialias: true,

      autoResize: true,

      camera: {



      }

    }

  }

  const seahorse = new Seahorse(APP_CONFIG);
  const application = new Application();

  // Font Loader
  new WebFontLoader({

    google: {
      families: ['Montserrat:300,400,600']
    }

  }).then(() => {

    application.start();

  });

});
