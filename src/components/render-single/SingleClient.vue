<template>
<div class="single-client container">
  <h1>
    C L I E N T
  </h1>
  <h1>
    I N F O R M A  T I O N
  </h1>
  <form @submit.prevent="updateItem" >
      <div class="field ">
        <label for="name"> Name: </label>
        <input type="text" name="name" v-model="client.name">
      </div>
      <div class="field ">
        <label for="industry"> Industry: </label>
        <input type="text" name="industry" v-model="client.industry">
      </div>
      <div class="field ">
        <label for="email"> Email: </label>
        <input type="text" name="email" v-model="client.email">
      </div>
      <div class="field ">
        <label for="phone"> Phone: </label>
        <input type="text" name="phone" v-model="client.phone">
      </div>


      <!-- BUTTON:  -->
      <div class="field center-align">
       <button class="btn grey ">Update Client</button>
      </div>
    </form>
</div>
</template>

<script>
import db from '@/firebase/init.js';
export default {
  name: 'SingleClient',
  data() {
    return {
      client: null,
    };
  },
  methods: {
    updateItem() {
      const docId = this.$route.params.client_id;
      const ref = db.collection('clients').doc(docId);

      ref
        .update({
          name: this.client.name,
          industry: this.client.industry,
          email: this.client.email,
          phone: this.client.phone,
        })
        .then(() => {
          this.$router.push({ name: 'AllClients' });
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  created() {
    //fetch data from firestore by client id
    const docId = this.$route.params.client_id;
    const ref = db.collection('clients').doc(docId);
    ref
      .get()
      .then(res => {
        this.client = res.data();
      })
      .catch(err => {
        console.error(err);
      });
  },
};
</script>

<style>
.single-client h1 {
  text-align: center;
  font-size: 2em;
}
.single-client {
  margin-top: 100px;
  position: absolute;
  top: 25px;
  right: 25px;
  bottom: 25px;
  left: 175px;
  max-width: 600px;
}
</style>
