import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import HomeRoute from './routes/HomeRoute';
import Category from './components/Category'

class TopItems extends React.Component {
  render() {
    let tree = this.props.categories.tree;
    let categories = tree.map(
      (category, idx) => <Category key={idx} category={category} />
    );
    
    return <div>
      { categories }
    </div>;
  }
}

TopItems = Relay.createContainer(TopItems, {
  fragments: {
    categories: () => Relay.QL`
      fragment on CategoryTree { 
        tree { ${Category.getFragment('category')} }
      }
    `,
  },
});


Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:7070/graphql')
);

let mountNode = document.getElementById('root');
let rootComponent = <Relay.RootContainer
  Component={TopItems}
  route={new HomeRoute()} />;
ReactDOM.render(rootComponent, mountNode);
