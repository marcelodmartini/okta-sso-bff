// import session from 'express-session';
// const OktaAuth = require('@okta/oidc-middleware').OktaAuth;

// const oktaAuth = new OktaAuth({
//     clientId: '0oa7dhdaofcfzC1ws697',
//     clientSecret: 'uxkuJrMcBBnV9MJVBgVf6hJGfO45jYhQ8p6YzQQDgCJDsljPsY5qyWIiqsHirljV',
//     issuer: 'https://trial-5978519.okta.com/oauth2/default',
//     appBaseUrl: 'http://localhost:3001',
//     scope: ['openid', 'email', 'profile'],
//   });
  
//   function oktaMiddleware(req, res, next) {
//     const { token } = req.session;
  
//     if (!token) {
//       return res.redirect('/login');
//     }
  
//     oktaAuth.token.verify(token)
//       .then((jwt) => {
//         req.userContext = { token, jwt };
//         next();
//       })
//       .catch(() => {
//         res.redirect('/login');
//       });
//   }
  
//   module.exports = {
//     oktaAuth,
//     oktaMiddleware,
//   };