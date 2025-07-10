const express = require('express');
const { createSSRServer } = require('@rocketcode/ssr');
const { App } = require('./src/App');

const app = express();
const port = process.env.PORT || 3001;

// Define routes for SSR
const routes = [
  { path: '/', component: require('./src/pages/HomePage').HomePage },
  { path: '/about', component: require('./src/pages/AboutPage').AboutPage },
  { path: '/users/:id', component: require('./src/pages/UserPage').UserPage }
];

// Create SSR server
const ssrServer = createSSRServer(routes);

// Serve static files
app.use(express.static('dist'));

// Handle all routes with SSR
app.get('*', async (req, res) => {
  try {
    await ssrServer.handleRequest(req, res, App);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`SSR App running at http://localhost:${port}`);
}); 