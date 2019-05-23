<template>
  <div class="new-user-form container">
    <h1 class="grey-text">
      New User Form
    </h1>
    <form @submit.prevent="addItem" >
      <div class="field ">
        <label for="firstName"> First Name: </label>
        <input type="text" name="firstName" v-model="firstName">
      </div>
      <div class="field ">
        <label for="lastName"> Last Name: </label>
        <input type="text" name="lastName" v-model="lastName">
      </div>
      <div class="field ">
        <label for="role"> Role: </label>
        <input type="text" name="role" v-model="role">
      </div>
      <div class="field ">
        <label for="email"> Email: </label>
        <input type="text" name="email" v-model="email">
      </div>
      <div class="field ">
        <label for="phone"> Phone: </label>
        <input type="text" name="phone" v-model="phone">
      </div>
      <div class="field ">
        <label for="notes"> Notes: </label>
        <input type="text" name="notes" v-model="notes">
      </div>
        <!-- <label for="test"> TEST: </label>
        <select v-model="test">
          <option value=""> 111 </option>
          <option value=""> 222 </option>
          <option value=""> 333 </option>
        </select> -->

      <!-- BUTTON:  -->
      <div class="field center-align">
       <button class="btn grey ">Add User</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init.js';

export default {
  name: 'NewUserForm',
  data() {
    return {
      firstName: null,
      lastName: null,
      role: null,
      email: null,
      phone: null,
      notes: null,
      // test: null,
    };
  },
  methods: {
    addItem() {
      console.log(this.test);
      db
        .collection('users')
        .add({
          firstName: this.firstName,
          lastName: this.lastName,
          role: this.role,
          email: this.email,
          phone: this.phone,
          notes: this.notes,
        })
        .then(() => {
          this.$router.push({ name: 'AllUsers' });
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
.new-user-form h1 {
  text-align: center;
  font-size: 2em;
}

.new-user-form {
  margin-top: 100px;
  position: absolute;
  top: 25px;
  right: 25px;
  bottom: 25px;
  left: 175px;
  max-width: 600px;
}
</style>
