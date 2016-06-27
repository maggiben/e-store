import Relay from 'react-relay';

export default class extends Relay.Route {
  static routeName = 'HomeRoute';
  static queries = {
    categories: ((Component) => {
      return Relay.QL`
        query root {
          allCategory { ${Component.getFragment('categories')} }
        }
    `}),
  };
}
