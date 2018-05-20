import Component from '../../../seahorse/section/Component';

export default class Element extends Component {

  constructor(props) {
    super(_.assignIn(props,{name:'element'}));
    this.setContent('<p>Component</p>');


    this.addClick('p',() => {
      this.navigate('about');
    })
  }

}
