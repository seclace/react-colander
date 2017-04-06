import React, { Component, PropTypes } from 'react';

class Colander extends Component {

  static propTypes = {
    children: PropTypes.func.isRequired,
    colanders: PropTypes.array.isRequired,
    props: PropTypes.object,
  };

  colanders(props) {
    const { children, colanders, props: componentProps } = props;
    let colanderResult = colanders.reduce( (result, colander) => {
      return (result) ? result : colander(componentProps);
    }, false );
    return colanderResult ? colanderResult : children;
  }

  render () {
    const { props: componentProps } = this.props;
    const component = this.colanders(this.props);
    return typeof component === 'object'
      ? !component ? null : component
      : React.createElement(component, componentProps);
  }
}

export function colander(children, colanders) {
  return function ComposerWrapper(props) {
    return <Colander {...{ props, children, colanders }} />;
  }
}
