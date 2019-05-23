<template>
  <div class="sign-up container">
    <form @submit.prevent="signUp" class="card-panel">
      <h2 class="center">
        Sign Up
      </h2>

      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
       <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="username">Username:</label>
        <input type="text" name="username" v-model="username">
      </div>
      <p class="feedback red-text center" v-if="feedback">
        {{feedback}}
      </p>
      <div class="field center">
        <button class="btn grey ">
          Sign Up!
        </button>
      </div>
    </form>

  </div>
</template>

<script>
import slugify from 'slugify';
import db from '@/firebase/init';
import firebase from 'firebase';

export default {
  name: 'SignUp',
  data() {
    return {
      email: null,
      password: null,
      username: null,
      feedback: null,
      slug: null,
    };
  },
  methods: {
    signUp() {
      if (this.username && this.email && this.password) {
        this.slug = slugify(this.username, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        let ref = db.collection('users').doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = 'This alias already exists.';
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                console.log('USER ID: ', cred.user.uid);
                ref
                  .set({
                    username: this.username,
                    email: this.email,
                    role: null,
                    phone: null,
                    notes: null,
                    user_id: cred.user.uid,
                  })
                  .then(() => {
                    this.$router.push({ name: 'Home' });
                  });
              })
              .catch(err => {
                console.error(err);
                this.feedback = err.message;
              });
            // this alias does not yet exists in the db
          }
        });
        console.log('THIS:', this.slug);
      } else {
        this.feedback = 'Must fill all fields.';
      }
    },
  },
};
</script>

<style>
.sign-up {
  max-width: 400px;
  margin-top: 150px;
}

.sign-up h2 {
  font-size: 2.4em;
}

.sign-up .field {
  margin-bottom: 16px;
}
</style>
