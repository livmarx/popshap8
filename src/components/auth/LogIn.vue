<template>
 <div class="log-in container">
   <form @submit.prevent="logIn" class="card-panel">
    <h2 class="center">
     Log In
    </h2>
    <div class="field">
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email">
    </div>
    <div class="field">
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password">
    </div>
    <p class="feedback red-text center" v-if="feedback">
        {{feedback}}
      </p>
    <div class="field center">
      <button class="btn grey ">
        Log In!
      </button>
    </div>
   </form>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'LogIn',
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    logIn() {
      if (this.email && this.password) {
        console.log('Email: ', this.email);
        console.log('Password: ', this.password);
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log('cred.user: ', cred.user);
            this.$router.push({ name: 'Home' });
          })
          .catch(err => {
            console.error(err);
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.feedback = 'Must fill both fields to log in.';
      }
    },
  },
};
</script>

<style>
.log-in {
  max-width: 400px;
  margin-top: 150px;
}

.log-in h2 {
  font-size: 2.4em;
}

.log-in .field {
  margin-bottom: 16px;
}
</style>
