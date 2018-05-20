import View from '../../seahorse/section/View';
import Template from './template/Index.tpl';

export default class Index extends View {

  constructor(model) {
    super({name: 'index', model: model});
    this.setContent(Template({h1: 'Go to About >'}));
    this.initialize();

  }

  componentWillMount() {

    super.componentWillMount();

    this.$h1 = this._el.querySelector('h1');

    this.$h1.hit(() => {
      this.navigate('about');
    });

    this.ready();
  }


}
