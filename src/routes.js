// Views
import SignUp from '@views/signup.svelte';
import Login from '@views/login.svelte';
import Index from '@views/index.svelte';
import Error from '@views/error.svelte';

// Helpers
import { isLoggedIn } from '@helpers/user.js';

// Packages
import { wrap } from 'svelte-spa-router';

const routes = {
  '/': Index,
  '/login': Login,
  '/signup': SignUp,
  '*': Error,
};

export { routes };
