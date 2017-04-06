import React, { Component } from 'react'
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { colander } from './../index';

describe('React', () => {

  const props = { fetching: false, user: { id: 1 } };

  class Foo extends Component {
    render() {
      return <div className="foo" />
    }
  }

  class Preloader extends Component {
    render() {
      return <div className="preloader" />
    }
  }

  class UnauthMessage extends Component {
    render() {
      return <div className="unauth-message" />
    }
  }

  function preload(props) {
    if (props.fetching) return <Preloader />;
  }

  function unauth(props) {
    if (!props.user) return <UnauthMessage />;
  }

  describe('colander', () => {

    const FooComposer = colander(Foo, [preload, unauth]);
    const wrapper = mount( <FooComposer {...props} /> );

    it('should render Foo wrapped to Colander', () => {
      wrapper.setProps(props);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render Preloader instead Foo', () => {
      const props = { fetching: true, user: null };
      wrapper.setProps(props);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render UnauthMessage instead Foo', () => {
      const props = { fetching: false, user: null };
      wrapper.setProps(props);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

  });

});
