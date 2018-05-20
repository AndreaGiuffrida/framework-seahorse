import Signal from '../../seahorse/signals/SiteSignals';

export default class Canvas {

  constructor() {

  }

  start() {

    Signal._initialize.dispatch();

  }

}
