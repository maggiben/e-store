import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import styles from './Product.css';

@CSSModules(styles)
class Product extends React.Component {

  constructor(props, context) {
    super(props, context);
    //console.log('contructed', this)
  }
  
  render() {
    let {product} = this.props;
    let urls =  product.images.map(image => {
      return image.url.http;
    });

    /*
    let thumbnail = classNames({
      'border': true,
      'border2': false
    }, {
      'turf-master': true
    });
    */
    let thumbnail = classNames(styles['turf-master']);

    //console.log(styles);
    //console.log(thumbnail);

    //className={thumbnail} styleName='border'
    return (
      <div>
        <h5>{product.title}</h5>
          {product.images.map((image, idx) => (
            <img key={image.id} src={image.url.http} height="48" className={thumbnail} styleName='border'/>
          ))}
      </div>
    );
  }
}

//productSearch(category: "1275721228505579605")
export default Relay.createContainer(Product, {
  fragments: {
    product: () => Relay.QL`
      fragment on Product {
        id
        title
        images {
          id
          url {
            http
          }
        }
      }
    `,
  },
});
