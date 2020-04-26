const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('../config');
const NAMESPACE = config.NAMESPACE;

// MIDDLEWARE
exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: 'https://gyan0621.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: '48nrZH2R1bCh19d9U38pwrFnlT4zNHkF',
  issuer: 'https://gyan0621.eu.auth0.com/',
  algorithms: ['RS256']
})


exports.checkRole = role => (req, res, next) => {
  const user = req.user;
  console.log('role passed', role);
  console.log('user here',user);
  console.log('Namespace',NAMESPACE);
  console.log('user namespace role',user[NAMESPACE + '/role']);
  if (user && user[NAMESPACE + '/role'] && (user[NAMESPACE + '/role'] === role)) {
    next();
  } else {
    return res.status(401).send({title: 'Not Authorized', detail: 'You are not authorized to access this data'})
  }
}



