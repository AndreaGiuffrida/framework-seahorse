class Time {

  constructor() {

  }

  start() {
    this._time = Date.now();
    return this;
  }

  getCurrentTime() {
    return ((Date.now() - this._time) / 1000).toFixed(3);
  }

}


export default (new Time);
