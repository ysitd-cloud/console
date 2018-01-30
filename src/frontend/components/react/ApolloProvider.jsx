import React, { Component } from 'react';
import { ApolloProvider as ReactApolloProvider } from 'react-apollo';
import PropTypes from 'prop-types';
import { defaultManager } from '../../service/apollo';

export default class ApolloProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      client: null,
      hasError: false,
    };
  }

  componentDidMount() {
    this.subscription = defaultManager.getClientObservable()
      .subscribe(client => this.setState({ client }));
    defaultManager.getClient()
      .then(client => this.setState({ client }));
  }

  componentWillUnmount() {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error, info);
  }


  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    if (!this.state.client) {
      return null;
    }
    return (
      <ReactApolloProvider client={this.state.client}>
        {this.props.children}
      </ReactApolloProvider>
    );
  }
}
