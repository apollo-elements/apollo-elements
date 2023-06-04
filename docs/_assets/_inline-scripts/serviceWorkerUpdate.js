async function serviceWorkerUpdate() {
  if ('serviceWorker' in navigator) {
    const oldReg = await navigator.serviceWorker.getRegistration();
    let oldSwState;
    if (oldReg && oldReg.active) {
      oldSwState = oldReg.active.state;
    }

    let refreshing;

    navigator.serviceWorker.addEventListener('controllerchange', async () => {
      if (refreshing) {
        return;
      }

      const newReg = await navigator.serviceWorker.getRegistration();
      let newSwState;
      if (newReg && newReg.active) {
        newSwState = newReg.active.state;
      }

      if (oldSwState === 'activated' && newSwState === 'activating') {
        refreshing = true;
        window.location.reload();
      }
    });
  }
}

serviceWorkerUpdate();
