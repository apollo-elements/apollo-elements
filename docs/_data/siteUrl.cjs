let url = '';

// handling netlify previews
switch (process.env.CONTEXT) {
  case 'production':
    url = process.env.URL;
    break;
  case 'deploy-preview':
    url = process.env.DEPLOY_URL;
    break;
  case 'branch-deploy':
    url = process.env.DEPLOY_PRIME_URL;
    break;
  /* no default */
}

module.exports = url;
