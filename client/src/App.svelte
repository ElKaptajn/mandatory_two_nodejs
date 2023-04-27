<script>
  import { Router, Route } from "svelte-navigator";
  import Login from "./pages/Login/Login.svelte";
  import Home from "./pages/Home/Home.svelte";
  import Failed from "./pages/Failed/Failed.svelte";
  import { isAuthenticated } from "./store/globalStore"; 
  import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<SvelteToast />

<Router>
  <Route path="/"  component={Login}/>
  {#if $isAuthenticated} <!-- check if the user is logged in -->
  <Route path="/home" component={Home} />
  {:else}
    <Route  component={Failed}/>
  {/if}
</Router>