import React from 'react';
import { LoggerService } from 'rocketcode-framework-upgraded';

interface {{name}}Props {
  // Add your props here
}

const {{name}}: React.FC<{{name}}Props> = (props) => {
  const logger = new LoggerService({ module: '{{name}}' });

  React.useEffect(() => {
    logger.debug('{{name}} component mounted');
    return () => {
      logger.debug('{{name}} component unmounted');
    };
  }, []);

  return (
    <div className="{{name.toLowerCase}}-component">
      <h1>{{name}} Component</h1>
      {/* Add your component content here */}
    </div>
  );
};

export default {{name}}; 