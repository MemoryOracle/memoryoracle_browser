require.config({
   baseUrl: '/js',
   paths: {
      'testmod': 'testmod',
      'test': 'jsx/test',
      'commentbox': 'jsx/commentbox',
      'react': '/lib/react/react',
      'jquery': '/lib/jquery/jquery',
      'require': '/lib/requirejs/require',
   }
});

require([
   'commentbox',
], (commentbox) => {
   commentbox.initialize();
});
