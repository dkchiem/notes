import SignUp from '@views/signup.svelte';
import Login from '@views/login.svelte';
import Index from '@views/index.svelte';
import Error from '@views/error.svelte';

const routes = {
  '/': Index,
  '/login': Login,
  '/signup': SignUp,
  '*': Error,
};

export { routes };
