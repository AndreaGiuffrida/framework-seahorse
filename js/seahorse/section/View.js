const PROP_INITIALIZED = 'initialized';
const PROP_READY = 'ready';
const PROP_ACTIVE = 'active';
const PROP_UNMOUNT = 'unmount';

export default class View  {

  constructor(props) {

    this._componentList = new Array();

    this._hitList = new Array();

    this._model = props.model;
    this._name = props.name;
    this._parent = props.parent;
    this._component = props.component;

    this._el = document.createElement(!this._component ? 'section' : 'div');
    this._el.setAttribute('id',this._name);

    if(this._component) {
      this._el.addClass(`${this._parent._name}__component`);
    }

    this.setProxy();
  }

  setProxy() {

    this._state = new Proxy({}, {

      set: (target, prop, value) => {

        target[prop] = value;

        switch (prop) {

          case PROP_INITIALIZED:
            if(value == true)
            this.componentWillMount();
          break;

          case PROP_READY:
            if(value == true)
            this.componentDidMount();
          break;

          case PROP_UNMOUNT:
            if(value == true)
            this.componentWillUnmount();
          break;

        };

        return target[prop];

      }

    });

  }

  componentWillMount() {
    log(`%cSection ${this._name} will mount`,log.style.section);
  }

  componentDidMount() {
    log(`%cSection ${this._name} did mount`,log.style.section);
    this.in();
  }

  componentWillUnmount() {
    log(`%cSection ${this._name} will unmount`,log.style.section);
    this.out();
  }

  initialize() {
    fastdom.measure(() => {
      this.setState(PROP_INITIALIZED,true);
    });
  }

  ready() {
    fastdom.measure(() => {
      this.setState(PROP_READY,true);
    });
  }

  unmount() {
    fastdom.measure(() => {
      this.setState(PROP_UNMOUNT,true);
    });
  }

  destroy() {
    fastdom.measure(() => {
      _.each(this._hitList,(obj) => {
        obj.el.removeEventListener('click',obj.callback);
        delete(obj.el);
        obj.el = null;
      });

      this._hitList = [];

      this._el.innerHTML = '';
      this._el.parentNode.removeChild(this._el);
      this._el = null;

    });
  }

  find(el) {
    return el ? this._el.querySelector(el) : this._el;
  }

  empty(el) {
    if(el) this._el.querySelector(el).innerHTML = '';
    else this._el.innerHTML = '';
    return this;
  }

  complete() {
    log(`%cSection ${this._name} complete`,log.style.section);
    this._model.complete();
  }

  in() {
    this.complete();
  }

  out() {
    this._model.destroy();
  }

  navigate(url) {
    this._model.navigate(url);
  }

  addClick(el,callback) {
    this._hitList.push({
      el: this.find(el).hit(callback),
      callback: callback
    });
  }

  addComponent(ComponentInstance,name,el = null) {

    let component = new ComponentInstance({
      model:this._model,
      parent: this,
      component:true,
    });

    this.find(el).appendChild(component._el);
    this._componentList[name] = component;
  }

  getComponent(name) {
    return this._componentList[name];
  }

  deleteComponent(name) {
    this._componentList[name].destroy();
    this._componentList[name] = null;
    this._componentList = _.pickBy(this._componentList,_.identity);
  }

  setContent(html) {
    this._el.innerHTML = html;
  }

  setState(prop,value = null) {

    if(_.isObject(prop)) {
       this._state = Object.assign(this._state, prop);
    } else {
      this._state[prop] = value;
    }


  }


}
