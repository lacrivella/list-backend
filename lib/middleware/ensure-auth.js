const jwt = require('express-jwt');
const jwtRsa = require('jwks-rsa');

module.exports = jwt({
  credentialsRequired: process.env.NODE_ENV !== 'test',
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://lacrivella.auth0.com/.well-known/jwks.json'
  }),
  audience: 'k31RW6n8cmXbX4GkHl251mQek3EqQbxZ',
  issuer: 'https://lacrivella.auth0.com',
  algorithms: ['RS256']
});