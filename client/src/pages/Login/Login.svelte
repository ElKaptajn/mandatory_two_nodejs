<script>
    import { isAuthenticated, BASE_URL } from "../../store/globalStore";
    import { toast } from '@zerodevx/svelte-toast'

    export let navigate;
    let username = '';
    let password = '';
  
    async function login() {
      const res = await fetch(`${$BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      });
  
      if (res.ok) {
        const user = await res.json();
        sessionStorage.setItem('userid', user.id); 
        sessionStorage.setItem('username', user.username); 
        sessionStorage.setItem('userrole', user.role); 
        $isAuthenticated = true;
        navigate('/home');
      } else {
        toast.push('Wrong username or password!', {
    theme: {
    '--toastColor': 'mintcream',
    '--toastBackground': 'rgba(255, 0, 0, 1)',
    '--toastBarBackground': '#FFFF'
  }
})
      }
    }
  </script>
  
  <div>
    <label>Username: <input bind:value={username} /></label>
    <label>Password: <input type='password' bind:value={password} /></label>
    <button on:click={login}>Login</button>
  </div>
  
    <style>
        div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        }

        label {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        }
        
    </style>