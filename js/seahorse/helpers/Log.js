import { COLOR } from './Colors';

const LOG_STYLE = {
  message: `background: ${COLOR.azure}; color: ${COLOR.white}; padding: 2px 10px`,
  warning: `background: ${COLOR.darkgray}; color: ${COLOR.orange}; padding: 2px 10px`,
  signal: `background: ${COLOR.purple}; color: ${COLOR.white}; padding: 2px 10px`,
  action: `background: ${COLOR.darkblue}; color: ${COLOR.white}; padding: 2px 10px`,
  routing: `background: ${COLOR.green}; color: ${COLOR.white}; padding: 2px 10px`,
  section: `background: ${COLOR.darkblue}; color: ${COLOR.white}; padding: 2px 10px`
}

class Log {

  constructor() {
    window.log = this.log;
    window.log.style = LOG_STYLE;
  }

  log(...args) {

    if(args.length > 1)
      args[0] = args[0].replace('%c',`%c${Time.getCurrentTime()} `);

    if(window.App.debug)
      console.log.apply(this,args);
  }

}

export default (new Log);
