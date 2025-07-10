import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { LoggerService } from 'rocketcode-framework-upgraded';

interface {{name}}PageProps {
  // Add your props here
}

const {{name}}Page: React.FC<{{name}}PageProps> = (props) => {
  const logger = new LoggerService({ module: '{{name}}Page' });

  React.useEffect(() => {
    logger.info('{{name}} page loaded on client');
  }, []);

  return (
    <>
      <Head>
        <title>{{name}} - RocketCode App</title>
        <meta name="description" content="{{name}} page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="{{name.toLowerCase}}-page">
        <div className="container">
          <h1>{{name}} Page</h1>
          <p>This is a Server-Side Rendered page.</p>
          
          <div className="content">
            <p>Welcome to the {{name}} page!</p>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const logger = new LoggerService({ module: '{{name}}Page' });
  
  logger.info('{{name}} page requested', { 
    url: context.req.url,
    method: context.req.method 
  });

  // Add your server-side data fetching logic here
  
  return {
    props: {
      // Add your props here
    },
  };
};

export default {{name}}Page; 