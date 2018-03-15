export function loadServiceWorker() {
  if (ENV.BUILD_TARGET === ENV.BUILD_TARGET_CLIENT) {
      let registerServiceWorker = require('service-worker-loader!./service.ts').default;
      registerServiceWorker().then(() => console.log('loaded sw'))
        .catch(() => console.warn('failed to register sw'));
    }
}

// export function loadWorker(loader: string, path: string) {
//   if (ENV.BUILD_TARGET === ENV.BUILD_TARGET_CLIENT) {
//     return require(`${loader}!${path}`).default;
//   } else {
//     return '';
//   }
// }