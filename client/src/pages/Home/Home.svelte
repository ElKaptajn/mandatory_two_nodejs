<script>
    import { writable } from "svelte/store";
    import { BASE_URL } from "../../store/globalStore";
  
    const username = writable(sessionStorage.getItem('username'));

    async function logout() {
        const response = await fetch(`${$BASE_URL}/auth/logout`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
            sessionStorage.clear();
            window.location.href = '/';
        } else {
            console.error("Logout failed");
        }
    }

    async function sendEmail(){
      await fetch(`${$BASE_URL}/auth/email`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    }

 

</script>
  
  {#if $username}
    <h1>Welcome, {$username}!</h1>
  {:else}
    <h1>Welcome!</h1>
  {/if}

  <button on:click={sendEmail}>Send ticket</button>
  <button on:click={logout}>Logout</button>
  