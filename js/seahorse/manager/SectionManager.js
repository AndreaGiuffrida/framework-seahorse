import Signal from '../signals/SiteSignals';
import Routing from '../router/RoutingManager';
import { ROUTER_EVENT } from '../router/RouterEvents';

export default class SectionManager {

  constructor(sections) {

    this._current = null;

    this._sections = sections;

    this._el = document.getElementById('section-holder');
    Signal._routing.add(this.onRouteChangeHandler.bind(this));

  }

  onRouteChangeHandler(action, url) {


    switch(action) {

      case ROUTER_EVENT.action.urlChanged:

        let slug;

        if(_.isArray(url)) {
          if(Routing.lang != '') {
            slug = String(url[1]).toLowerCase();
          } else {
            slug = String(url[0]).toLowerCase();
          }
        } else {
          slug = String(url).toLowerCase();
        }


        let section = this._sections[0];
        _.each(this._sections,(s) => {
          _.each(s._routes,(route) => {
            if(route.toLowerCase() == slug) section = s;
          });
        });

        section.fragment = url;
        this.changeSection(section);

      break;

    }

  }

  changeSection(section) {

    if(this._current && this._current._model == section) return;

    if(this._current) {
      this._current.unmount();
    }

    this._current = section.create();

    fastdom.mutate(() => {
      this._el.appendChild(this._current._el);
    });


  }

}
