module.exports = async function siteConfig() {
  return {
    analytics: 'G-3H2TDNQDBR',
    dir: 'ltr',
    lang: 'en',
    name: 'Apollo Elements',
    description: 'Build high-performance GraphQL web apps with Apollo Elements',
    socialLinks: [
      {
        name: 'GitHub',
        url: 'https://github.com/apollo-elements/apollo-elements',
      },
      {
        name: 'Discord',
        url: 'https://discord.gg/2FgMbKf'
      },
      {
        name: 'Telegram',
        url: 'https://t.me/apolloelements'
      }
    ],
    gitSiteUrl: 'https://github.com/apollo-elements/apollo-elements',
    helpUrl: 'https://github.com/apollo-elements/apollo-elements/issues',
    logoAlt: '',
    iconColorMaskIcon: 'white',
    iconColorMsapplicationTileColor: 'black',
    iconColorThemeColor: 'black',
    socialMediaImage: [
      'https://res.cloudinary.com/apolloelements/image/upload',
      [
        'w_1200',
        'h_630',
        'c_fill',
        'q_auto',
        'f_auto',
      ].join(','),
      [
        'w_600',
        'c_fit',
        'co_rgb:eee',
        'g_west',
        'x_100',
        'l_text:open sans_64_bold:Apollo Elements',
      ].join(','),
      [
        'w_600',
        'c_fit',
        'co_rgb:ddd',
        'g_south_west',
        'x_100',
        'y_100',
        'l_text:open sans_48:GraphQL Custom Elements'
      ].join(','),
      'social-template.svg',
    ].join('/'),
  };
};
