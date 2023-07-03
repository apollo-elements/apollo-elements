import '@apollo-elements/components';

const client = document.querySelector('apollo-client');
(async function() {
  await customElements.whenDefined('apollo-client');
  await client.updateComplete;
  client.typePolicies = {
    Launch: {
      fields: {
        launch_date_utc(next) {
          try {
            return new Date(next).toDateString();
          } catch(e) {
            return next;
          }
        }
      }
    }
  };
})();
