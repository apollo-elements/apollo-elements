export function cloudinary(opts, post) {
  const options = typeof opts === 'boolean' ? {
    title: {
      fontSize: 64,
      text: ''
    },
    subtitle: {
      fontSize: 48,
      text: ''
    }
  } : opts;

  const title = (options.title.text || 'Apollo Elements').replace(/,/g, '%252C'); 
  const subtitle = (options.subtitle.text || post.title).replace(/,/g, '%252C');

  return [
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
      `l_text:open sans_${options.title.fontSize}_bold:${title}`,
    ].join(','),
    [
      'w_600',
      'c_fit',
      'co_rgb:ddd',
      'g_south_west',
      'x_100',
      'y_100',
      `l_text:open sans_${options.subtitle.fontSize || 48 }:${subtitle}`
    ].join(','),
    'social-template.svg',
  ].join('/');
}

//res.cloudinary.com/apolloelements/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_west,x_100,l_text:open sans_64_bold:Apollo Elements/w_600,c_fit,co_rgb:ddd,g_south_west,x_100,y_100,l_text:open sans_48:Write GraphQL Components Once, Run them in Every Framework/social-template.svg
//res.cloudinary.com/apolloelements/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_west,x_100,l_text:open sans_64_bold:Apollo Elements/w_600,c_fit,co_rgb:ddd,g_south_west,x_100,y_100,l_text:open sans_48:Apollo Elements/social-template.svg
