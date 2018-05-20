/**
* Seahorse Javascript MVW Framework v0.1
*
*         ,  ,
*         \:.|`._
*      /\/;.:':::;;;._
*     <  .'     ':::;(
*      < ' _      '::;>
*       \ (9)  _  :::;(
*       |     / \  \\:;`>
*       |    /  |  //:;(
*       |   (  <=-  .::;>
*       (  a) )=-  .::;(
*        '-' <=- _.::;>
*           )==.'_(::(  ,
*          <==- ~_ >(,-'(
*          )=- '._(:  _.~>
*         <==-    ':.' _(
*          <==-    .:'_ (
*           )==- .::'  '~>
*            <=- .:;(`'.(
*             `)  ':;>  `
*        .-.  <    :;(
*      <`.':\  )    :;>
*     < :/<_/  <  .:;>
*     <  `---'`  .::(`
*      <       .:;>'
*       `-..:::-'`
*
*/

import '../helpers/Log';
import '../helpers/Helpers';
import '../signals/SiteSignals';
import Time from '../helpers/Time';
import WindowEvents from '../events/WindowEvents';
import Routing from '../router/RoutingManager';
import SiteManager from '../manager/SiteManager';

export default class Core {

  constructor(config) {
    // Set a global var App
    SiteManager.initialize();

    window.App = {};
    window.Time = Time.start();
    this.initialize(config);
  }

  initialize(config) {

    Routing.initializeLang(config.multilanguage);

    window.App.debug = config.debug;
    window.App.webgl = _.isObject(config['webgl']) ? true : false;

    log('%cSeahorse Javascript MVW Framework v0.1',log.style.message);

    if(config.resize) {
      WindowEvents.applyResize();
    }

    if(config.scroll) {
      WindowEvents.applyScroll();
    }

  }

}
