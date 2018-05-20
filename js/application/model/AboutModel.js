import View from '../view/About';
import Model from '../../seahorse/section/Model';

export default class AboutModel extends Model {

  constructor(routes = []) {
    super(View,routes);
  }

}
