import View from '../../seahorse/section/View';
import Template from './template/Index.tpl';

export default class About extends View {

  constructor(model) {
    super({name: 'about', model: model});
    this.setContent(Template({h1: '< Back to Home'}));
    this.initialize();
  }

  componentWillMount() {
    super.componentWillMount();

    this.$h1 = this._el.querySelector('h1');

    this.$h1.hit(() => {

      this.navigate('');

    });

    this.ready();
  }




}
