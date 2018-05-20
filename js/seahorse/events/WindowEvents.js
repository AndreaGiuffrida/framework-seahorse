import Signal from '../signals/SiteSignals';

const RESIZE = "resize";
const SCROLL = "scroll";
const ORIENTATIONCHANGE = "orientationchange";

class WindowEvents {

  constructor() {
    this.onResizeHandler = this.onResizeHandler.bind(this);
  }

  applyResize() {
    this.onResizeHandler();
    window.addEventListener(RESIZE,_.debounce(this.onResizeHandler,60));
    window.addEventListener(ORIENTATIONCHANGE,_.debounce(this.onResizeHandler,60));
  }

  applyScroll() {
    this.onScrollHandler();
    window.addEventListener(SCROLL,this.onScrollHandler);
    window.addEventListener(ORIENTATIONCHANGE,this.onScrollHandler);
  }

  onResizeHandler() {
    fastdom.measure(() => {
      let [w, h] = [window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight];
      let scrollY  = window.pageYOffset || document.documentElement.scrollTop;
      Signal._resize.dispatch(w,h,scrollY);
    });


  }

  onScrollHandler() {
    fastdom.measure(() => {
      let scrollY = window.pageYOffset || document.documentElement.scrollTop;
      Signal._scroll.dispatch(scrollY);
    });

  }

}


export default (new WindowEvents);
