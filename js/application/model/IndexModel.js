import View from '../view/Index';
import Model from '../../seahorse/section/Model';

export default class IndexModel extends Model {

  constructor(routes = []) {
    super(View,routes);
  }

}
