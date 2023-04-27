<script>
    import { writable } from "svelte/store";
    import { BASE_URL } from "../../store/globalStore";
//    import nodemailer from 'nodemailer';
  
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

//     function sendTicket() {
//   // create a nodemailer transporter object
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'elkaptajn.test@gmail.com',
//       pass: process.env.EMAIL_PASSWORD
//     }
//   });

//   // create a mailOptions object with the necessary information for the email
//   const mailOptions = {
//     from: 'elkaptajn.test@gmail.com',
//     to: 'xeni0103@stud.kea.dk',
//     subject: 'Ticket Information',
//     text: 'Here is the information for your ticket...'
//   };

//   // send the email using the transporter.sendMail() function
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// }

 

</script>
  
  {#if $username}
    <h1>Welcome, {$username}!</h1>
  {:else}
    <h1>Welcome!</h1>
  {/if}

  <button>Send ticket</button>
  <button on:click={logout}>Logout</button>
  