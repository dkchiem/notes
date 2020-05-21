import SignUp from '@views/signup.svelte';
import Login from '@views/login.svelte';
import Index from '@views/index.svelte';

const routes = [
  {
    name: '/',
    component: Index,
  },
  {
    name: '/login',
    component: Login,
  },
  {
    name: '/signup',
    component: SignUp,
  },
];

export { routes };
