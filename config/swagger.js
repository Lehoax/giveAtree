// auto generation doc
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'REST API DOC for give a tree', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for give a tree', // short description of the app
  },
  host: 'localhost:3000', // the host or url of the app
  basePath: '/api', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);