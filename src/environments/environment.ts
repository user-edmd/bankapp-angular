// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0: {
    domain: 'dev-41u3yy83f4dtjy7v.us.auth0.com',
    clientId: 'mHi8CvJjwB4gCwubGTCZCntl1DG14m0z',
    scope: 'openid profile email read:appointments read:user_metadata',
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  },
  httpInterceptor: {
    allowedList: ['localhost:8080',],
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
