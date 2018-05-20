/**
 * Router Class
 * @name Signal
 * @author Andrea Giuffrida
 * @constructor
 */

import { ROUTER_EVENT } from './RouterEvents';

const MODE_HISTORY = ROUTER_EVENT.mode.history;
const MODE_HASH = ROUTER_EVENT.mode.hash;

export default class Router {

  constructor(options) {

    options = options || {mode: MODE_HISTORY};

    this._interval = null;


    this._forceURL = false;

    /**
     * @type array
     * @private
     */
    this._routes =[];

    /**
     * @type string
     * @private
     */
    this._mode = options && options.mode && options.mode == MODE_HISTORY && !!(history.pushState) ? MODE_HISTORY : MODE_HASH;

    /**
     * @type string
     * @private
     */
    this._root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';

    /**
     * @type string
     * @private
     */
    this._fragment = this.getFragment();

  }

  /**
   * Get the current fragment
   * @param {}
   * @return {string}
   */
  getFragment() {

    let fragment = '';


    if(this._mode === MODE_HISTORY) {

      fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;

    } else {

      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';

    }

    this._fragment = this.clearSlashes(fragment);
    return this._fragment;

  }

  getFragmentArray() {
    return this.getFragment().split('/');
  }

  /**
   * Add the routing function
   * @param {route} string
   * @param {handler} function
   * @return {Router}
   */
  add(route, handler) {

    if(typeof route == 'function') {
      handler = route;
      route = '';
    }

    this._routes.push({ route: route, handler: handler });
    return this;
  }


  /**
   * Remove the routing function
   * @param {param} string
   * @return {Router}
   */
  remove(param) {

    _.each(this._routes, function(r,i) {
      if(r.handler === param || r.route.toString() === param.toString()) {
          this._routes.splice(i, 1);
          return this;
      }
    })

    return this;

  }

  /**
   * Destroy the Router object
   * @param {param} string
   * @return {Router}
   */
  dispose() {

    this._routes = [];
    this._mode = null;
    this._root = '/';

  }

  /**
   * Check the current fragment
   * @param {f} string
   * @return {Router}
   */
  check(f) {

    let fragment = f != undefined ? f : this.getFragment();


    _.each(this._routes, function(r) {

      let match = fragment.match(r.route);

      if(match) {
        r.handler(match.input.split('/'));
        return this;
      }

    })

  }

  /**
   * URL Listener
   * @param {}
   * @return {Router}
   */
  listen() {


    let self = this;
    let current = this.getFragment();
    let fn = () => {
      if(current !== self.getFragment() || this._forceURL) {
          this._forceURL = false;
          current = self.getFragment();
          self.check(current);
      }
    }

    clearInterval(this._interval);
    this._interval = setInterval(fn, 100);

    return this;
  }

  /**
   * Navigate function
   * @param {path} string
   * @return {Router}
   */
  navigate(path, force = false) {

    this._forceURL = force;

    path = path ? path : '';

    if(this._mode === MODE_HISTORY)
      history.pushState(null, null, this._root + this.clearSlashes(path));
    else
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;

    return this;
  }

  /**
   * Clear slashes helper function
   * @param {path} string
   * @return {string}
   */
  clearSlashes(path) {

    return path.toString().replace(/\/$/, '').replace(/^\//, '');

  }

}
