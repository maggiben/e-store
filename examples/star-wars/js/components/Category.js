import React from 'react';
import Relay from 'react-relay';

import Product from './Product';

class Category extends React.Component {
  render() {
    let {category} = this.props;

    return (
      <div>
        <h3>{category.title} <small class="badge">children: {category.children.length}</small></h3>
        <hr />
        <ol>
        {category.children.map(function(child, idx) {
          return (
            <li key={child.id}>
              {child.title}
              <ul>
                {child.products.edges.map(({node}) => (
                  <li key={node.id} ><Product product={node}/></li>
                ))}
              </ul>
            </li>
          );
        })}
        </ol>
      </div>
    );
  }
}

export default Relay.createContainer(Category, {
  initialVariables: {
    first: 2
  },
  fragments: {
    category: () => Relay.QL`
      fragment on Category {
        title
        slug
        children {
          id
          title
          products(first: $first) {
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
