import Signal from '../seahorse/signals/SiteSignals';
import SectionManager from '../seahorse/manager/SectionManager';

// Sections
import Canvas from './canvas/Canvas';
import IndexModel from './model/IndexModel';
import AboutModel from './model/AboutModel';



export default class Application {

  constructor() {

    if(App.webgl) {

      this._webgl = new Canvas();

    }

    this._manager = new SectionManager(
      [
        new IndexModel(['','home']),
        new AboutModel(['about'])
      ]
    );

  }

  start() {

    if(this._webgl) {

      this._webgl.start();

    } else {

      Signal._initialize.dispatch();

    }
  }

}
