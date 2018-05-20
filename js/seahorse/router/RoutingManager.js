import { ROUTER_EVENT } from './RouterEvents';
import Router from './Router';
import Signal from '../signals/SiteSignals';

class RoutingManager {

  constructor() {

    /**
     * @type String
     * @private
     */
    this._url = '';

    /**
     * @type String
     * @private
     */
    this._lang = '';

    /**
     * @type Boolean
     * @private
     */
    this._listen = false;

    /**
     * @type String
     * @private
     */
    this._queue = null;

    /**
     * @type Router
     * @private
     */
    this._route = new Router({mode: ROUTER_EVENT.mode.history});
    this._route.add(this.onRouteChangeHandler.bind(this)).listen();
    Signal._routing.add(this.onRouteAction.bind(this));
  }

  start() {
    Time.start();
    log(`%cRouting has started`,log.style.signal);
    this._queue = this._route.getFragmentArray();
    Signal._routing.dispatch(ROUTER_EVENT.action.enableRouting,this._queue);
  }

  navigate(url) {
    this._route.navigate(this._lang + url);
  }

  onRouteAction(action, url) {

    switch(action) {

      case ROUTER_EVENT.action.enableRouting:

        this._queue = null;
        this._listen = true;
        this.onRouteChangeHandler(url);


      break;

      case ROUTER_EVENT.action.canRoute:

        this._listen = true;
        let frag = this._route.getFragmentArray();
        if(!_.isEqual(this._url, frag)) {
          this.onRouteChangeHandler(frag);
        }
        /*

        if(this._queue != null) {

          this.navigate(this._queue,true);
          //Signal._routing.dispatch(ROUTER_EVENT.action.urlChanged,this._queue);
        }
        */

      break;

    }

  }

  onRouteChangeHandler(url) {

    url = url == undefined ? '' : url;

    if(!this._listen) {
      this._queue = url;
      return false;
    }

    Time.start();
    this._url = url;
    this._listen = false;
    log(`%cRouting changes to: ${url}`,log.style.routing);
    Signal._routing.dispatch(ROUTER_EVENT.action.urlChanged,url);

  }

  initializeLang(isLang) {
    if(isLang) {
      this.lang = document.documentElement.getAttribute('lang') + '/';
    }
  }

  get lang() {
    return this._lang;
  }

  set lang(value) {
    this._lang = value;
  }

}

export default (new RoutingManager);
