// Views
import SignUp from '@views/signup.svelte';
import Login from '@views/login.svelte';
import Index from '@views/index.svelte';

// Helpers
import { isLoggedIn, isNotLoggedIn } from '@helpers/user.js';

const routes = [
  {
    name: '/',
    component: Index,
    onlyIf: {
      guard: isLoggedIn,
      redirect: '/login',
    },
  },
  {
    name: '/login',
    component: Login,
    onlyIf: {
      guard: isNotLoggedIn,
      redirect: '/',
    },
  },
  {
    name: '/signup',
    component: SignUp,
    onlyIf: {
      guard: isNotLoggedIn,
      redirect: '/',
    },
  },
];

export { routes };
