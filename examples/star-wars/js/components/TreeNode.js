import React from 'react';
import Relay from 'react-relay';
//import ExpandNodeMutation from '../mutations/ExpandNode';

class TreeNode extends React.Component {

  handleClick() {
    //Relay.Store.update(new ExpandNodeMutation({node: this.props.node}));
    this.props.relay.setVariables({
      expanded: !this.props.relay.variables.expanded
    });
  }

  render() {
    var node = this.props.node;
    var variables = this.props.relay.variables;
    return (
      <div className="node">
        <div className="title" onClick={this.handleClick.bind(this)}>{node.title}</div>
        <div className="children" style={{paddingLeft: 20}}>
          {variables.expanded && node.children && node.children.edges.map((edge)=> {
            return <TreeNodeContainer node={edge.node} key={edge.node.id}/>
          })}
        </div>
      </div>
    )
  }
}

const TreeNodeContainer = Relay.createContainer(TreeNode, {
  initialVariables: {
    expanded: false
  },
  fragments: {
    node: (variables) => {
      return Relay.QL`
      fragment on TreeNode {
        id,
        expanded,
        title,
        children(first: 1000) @include(if: $expanded) {
          edges {
            node {
              id,
              ${TreeNodeContainer.getFragment('node').if(variables.expanded)}
            }
          }
        }
      }
    `
    }
  },
});

export default TreeNodeContainer;