// @ts-check

const host = '';
const prefix = 'api/v1';

export const clientRoutes = {
  home: () => '/',
  login: () => '/login',
  signup: () => '/signup',
  about: () => '/about',
};

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
  dataPath: () => [host, prefix, 'data'].join('/'),
};
