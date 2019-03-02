
// Dependencies
import path from 'path';
import server from '@libs/server';
import getEnv from '@root/env';
import config from '../config';
// import methods from '/server/api/methods';

server.init({
  env: getEnv(path),
  config,
  // methods,
})
.then(() => {
  console.log('Server started, DB running...');
})
.catch(err => {
  console.log(err);
});
