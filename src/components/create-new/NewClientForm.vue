<template>
  <div class="new-client-form container">
    <h1 class="grey-text">
      New Client Form
    </h1>
    <form @submit.prevent="addItem" >
      <div class="field ">
        <label for="Name"> Name: </label>
        <input type="text" name="firstName" v-model="name">
      </div>
      <div class="field ">
        <label for="industry"> Industry: </label>
        <input type="text" name="industry" v-model="industry">
      </div>
      <div class="field ">
        <label for="email"> Email: </label>
        <input type="text" name="email" v-model="email">
      </div>
      <div class="field ">
        <label for="phone"> Phone: </label>
        <input type="text" name="phone" v-model="phone">
      </div>


      <!-- BUTTON:  -->
      <div class="field center-align">
       <button class="btn grey ">Add Client</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init.js';

export default {
  name: 'NewClientForm',
  data() {
    return {
      name: null,
      industry: null,
      email: null,
      phone: null,
    };
  },
  methods: {
    addItem() {
      console.log(this.test);
      db
        .collection('clients')
        .add({
          name: this.name,
          industry: this.industry,
          email: this.email,
          phone: this.phone,
        })
        .then(() => {
          this.$router.push({ name: 'AllClients' });
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
.new-client-form h1 {
  text-align: center;
  font-size: 2em;
}

.new-client-form {
  margin-top: 100px;
  position: absolute;
  top: 25px;
  right: 25px;
  bottom: 25px;
  left: 175px;
  max-width: 600px;
}
</style>
