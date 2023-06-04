(async () => {
  if ('serviceWorker' in navigator) {
    const { Workbox } = await import('workbox-window');

    const url = window.__rocketServiceWorkerUrl || '/service-worker.js';
    const wb = new Workbox(url);
    wb.addEventListener('message', event => {
      if (event.data.type === 'CACHE_UPDATED') {
        const { updatedURL } = event.data.payload;
        console.log(`Reloading as a newer version of ${updatedURL} became available!`);
        window.location.reload();
      }
    });
    wb.register()
      .then(function () {
        console.log('ServiceWorker registered.');
      })
      .catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  }
})();
