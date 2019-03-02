
require('babel-register')({

  presets: [
    [ require.resolve('babel-preset-env'), { targets: { node: 'current' } } ],
    require.resolve('babel-preset-stage-2')
  ],

  plugins: [
    [
      require.resolve('babel-plugin-transform-react-jsx'), { pragma: 'client.h' }
    ],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [ './' ],
        alias: { '@libs': '../../../libs', '@root': '../_root' },
      }
    ]
  ]

});

require('./src/server/index.js');
