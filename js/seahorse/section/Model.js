import { ROUTER_EVENT } from '../router/RouterEvents';
import Routing from '../router/RoutingManager';
import Signal from '../signals/SiteSignals';

export default class Model {

  constructor(View,routes) {

    this._fragment = null;

    this._viewInstance = View;
    this._routes = routes;
  }

  create() {
    this._view = new this._viewInstance(this);
    return this._view;
  }

  unmount() {
    this._view.unmount();
  }

  destroy() {
    this._view.destroy();
    delete this._view;
    this._view = null;
  }

  complete() {
    Signal._routing.dispatch(ROUTER_EVENT.action.canRoute);
  }

  navigate(url) {
    Routing.navigate(url);
  }

  get fragment() {
    return this._fragment;
  }

  set fragment(frag) {
    this._fragment = frag;
  }

  set resize(callback) {
    Signal._resize.add(callback);
  }

  set scroll(callback) {
    Signal._scroll.add(callback);
  }

}
