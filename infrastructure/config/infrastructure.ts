import okta from '@okta/okta-sdk-nodejs';
import OktaJwtVerifier = require('@okta/jwt-verifier');

// Okta Configurations
const oktaConfig = {
    domain: 'trial-5978519.okta.com',
    clientId: '0oa7dhdaofcfzC1ws697',
    apiToken: '00NxlDIfhhjjnKC_kwAKvXP_LdqX_JvugTCkSNIxmc',
};

// Initialize the Okta JWT verifier and client
const oktaJwtVerifier = new OktaJwtVerifier({ // Usa JwtVerifier en lugar de OktaJwtVerifier
    issuer: `https://${oktaConfig.domain}/oauth2/default`,
    clientId: oktaConfig.clientId,
});

//pass okta web Felipe2023
const oktaClient = new okta.Client({
    orgUrl: `https://${oktaConfig.domain}`,
    token: oktaConfig.apiToken,
    // authorizationMode: 'PrivateKey',
    // clientId: '{oauth application ID}',
    // scopes: ['okta.users.manage'],
    // privateKey: '{JWK}', // <-- see notes below
    // keyId: 'kidValue',
});

export { oktaJwtVerifier, oktaClient };

// {
//     header: {
//       typ: 'JWT',
//       alg: 'RS256',
//       kid: 'keyId'
//     },
//     claims: {
//       sub: 'sub',
//       name: 'name',
//       email: 'email',
//       ver: 1,
//       iss: 'https://foobar.org/oauth2/default',
//       aud: 'aud',
//       iat: 1657621175,
//       exp: 1657624775,
//       jti: 'jti',
//       amr: [ 'pwd' ],
//       idp: 'idp',
//       nonce: 'nonce',
//       preferred_username: 'username@foobar.org',
//       auth_time: 1657621173,
//       at_hash: 'at_hash'
//     },
//     toString: () => 'base64-encoded token',
//     setClaim: (claim, value) => token,
//     setJti: (jti) => token,
//     setSubject: (sub) => token,
//     setIssuer: (iss) => token,
//     setIssuedAt: (iat) => token,
//     setExpiration: (exp) => token,
//     setNotBefore: (nbf) => token,
//     isExpired: () => Boolean,
//     isNotBefore: () => Boolean,
//   {
//     userMessage: 'Jwt is expired',
//     jwtString: 'base64-encoded token',
//     parsedHeader: JwtHeader {
//       typ: 'JWT',
//       alg: 'RS256',
//       kid: 'keyId'
//     },
//     parsedBody:
//       ver: 1,
//       jti: 'jti',
//       iss: 'iss',
//       aud: 'api://default',
//       iat: 1657621175,
//       exp: 1657621475,
//       cid: 'cid',
//       uid: 'uid',
//       scp: [ 'openid', 'email', 'profile' ],
//       auth_time: 1657621173,
//       sub: 'userame@foobar.org'
//     },
//     innerError: undefined
//   }
