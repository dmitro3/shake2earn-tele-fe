import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: any;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  public componentDidCatch(error: any) {
    this.setState({ error });
  }

  public render() {
    if (this.state.error) {
      return <h1>{JSON.stringify(this.state.error)}</h1>;
    }

    return this.props.children;
  }
}
