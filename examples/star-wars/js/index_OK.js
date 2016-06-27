let React    = require('react');
let ReactDOM = require('react-dom');
let Relay    = require('react-relay');

import Product from './components/Product'
/*
class Product extends React.Component {
  render() {
    let {product} = this.props;
    console.log('product', product);
    return (
      <div>
        <h5>{product.title}</h5>
      </div>
    );
  }
}


//productSearch(category: "1275721228505579605")
Product = Relay.createContainer(Product, {
  fragments: {
    product: () => Relay.QL`
      fragment on Product {
        id
        title
      }
    `,
  },
});
*/
class Item extends React.Component {
  render() {
    let {category} = this.props;
    //console.log('category: ', category)
    /*
      <ul>
      {this.props.category.products.map(function(product, i) {
        return (
          <li key={product.id}>{i} ) {product.title}</li>
        );
      })}
      </ul>
    */
    /*
      <ul>
        {this.props.category.children.map(function(child, i) {
          return (
            <li key={child.id}>{i} ) {child.title}
              <ul>
                {child.products.map(function(product, i) {
                  return (
                    <li key={product.id}>{i} ) {product.title}</li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    */
    return (
      <div>
        <h3>{category.title} <small>children: {category.children.length}</small></h3>
        <hr />
        <ol>
        {category.children.map(function(child, idx) {
          return (
            <li key={child.id}>
              {child.title}
              <ul>
                {child.products.edges.map(({node}) => (
                  <li key={node.id}><Product product={node}/></li>
                ))}
              </ul>
            </li>
          );
        })}
        </ol>
      </div>
    );
  }
};

Item = Relay.createContainer(Item, {
  fragments: {
    category: () => Relay.QL`
      fragment on Category {
        title
        slug
        children {
          id
          title
          products(first: 10) {
            edges {
              node {
                id
                ${Product.getFragment('product')}
              }
            }
          }
        }
      }
    `,
  },
});

class TopItems extends React.Component {
  render() {
    let tree = this.props.categories.tree;
    //console.log(tree)

    let items = tree.map(
      (category, idx) => <Item key={idx} category={category} />
    );
    
    return <div>
      { items }
    </div>;
  }
}

TopItems = Relay.createContainer(TopItems, {
  initialVariables: {
    id: "1275721228505579605"
  },
  fragments: {
    categories: () => Relay.QL`
      fragment on CategoryTree { 
        tree { ${Item.getFragment('category')} }
      }
    `,
  },
});


class HackerNewsRoute extends Relay.Route {
  static routeName = 'HackerNewsRoute';
  static queries = {
    categories: ((Component) => {
      return Relay.QL`
      query root {
        allCategory { ${Component.getFragment('categories')} },
      }
    `}),
  };
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:7070/graphql')
);

let mountNode = document.getElementById('root');
let rootComponent = <Relay.RootContainer
  Component={TopItems}
  route={new HackerNewsRoute()} />;
ReactDOM.render(rootComponent, mountNode);
