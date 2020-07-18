// Views
import SignUp from '@views/signup.svelte';
import Login from '@views/login.svelte';
import Index from '@views/index.svelte';

// Helpers
import { isLoggedIn } from '@helpers/user.js';

// Packages
import { wrap } from 'svelte-spa-router';

const routes = {
  '/': wrap(Index, { redirect: '/login' }, async (detail) => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(3000);
    console.log('Ok');
    return false;
  }),
  '/login': wrap(Login, { redirect: '/' }, (detail) => {
    // return !isLoggedIn();
    return true;
  }),
  '/signup': wrap(SignUp, { redirect: '/' }, (detail) => {
    // return !isLoggedIn();
    return true;
  }),

  // // Catch-all
  // // This is optional, but if present it must be the last
  // '*': NotFound,
};

export { routes };
