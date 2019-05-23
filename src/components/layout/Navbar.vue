
<template>
  <div class="navbar">
    <nav class="nav-extended ">
      <div class="nav-content">
        <router-link to="">
          <span class="nav-title">P O P   |   S H A P</span>
        </router-link>
        <div class="non-title">
          <button v-if="!user">
            <router-link :to="{name: 'LogIn' }">
              <span > Log In </span>
            </router-link>
          </button>
          <button @click="logOut" v-if="user">
            <router-link to="">
              <span > Log out </span>
            </router-link>
          </button>
          <button v-if="!user">
            <router-link :to="{name: 'SignUp' }">
              <span > Sign Up </span>
            </router-link>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'Navbar',
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: 'LogIn' });
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style>
.navbar nav {
  padding: 0 20px;
  background-color: rgb(84, 101, 117);
  position: fixed;
  z-index: 1;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  background-color: slategray;
  margin: 5px;
}
</style>
