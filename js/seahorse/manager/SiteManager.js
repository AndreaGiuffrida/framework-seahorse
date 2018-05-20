import Signal from '../signals/SiteSignals';
import Routing from '../router/RoutingManager';

class SiteManager {

  constructor() {

    /**
     * @type Application
     * @private
     */
    this._app = null;
    Signal._initialize.addOnce(this.onApplicationStarted.bind(this));
  }

  initialize() {
    this._el = document.body;
  }

  onApplicationStarted() {
    log('%cApplication has started',log.style.signal);
    this._el.addClass('app--started');
    Routing.start();
  }


}

export default (new SiteManager);
