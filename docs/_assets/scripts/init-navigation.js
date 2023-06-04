import '@rocket/navigation/rocket-navigation.js';
import '@rocket/drawer/rocket-drawer.js';
const drawer = document.querySelector('#sidebar');

// Toggle button
const triggers = document.querySelectorAll('[data-action="trigger-mobile-menu"]');
for (const trigger of [...triggers]) {
  trigger.addEventListener('click', function () {
    drawer.opened = true;
  });
}
