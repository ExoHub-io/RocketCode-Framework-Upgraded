import React, { Component } from 'react';
import { LoggerService } from 'rocketcode-framework-upgraded';

interface {{name}}Props {
  // Add your props here
}

interface {{name}}State {
  // Add your state here
}

class {{name}} extends Component<{{name}}Props, {{name}}State> {
  private logger: LoggerService;

  constructor(props: {{name}}Props) {
    super(props);
    this.logger = new LoggerService({ module: '{{name}}' });
    this.state = {
      // Initialize your state here
    };
  }

  componentDidMount() {
    this.logger.debug('{{name}} component mounted');
  }

  componentWillUnmount() {
    this.logger.debug('{{name}} component unmounted');
  }

  render() {
    return (
      <div className="{{name.toLowerCase}}-component">
        <h1>{{name}} Component</h1>
        {/* Add your component content here */}
      </div>
    );
  }
}

export default {{name}}; 