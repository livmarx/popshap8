<template>
<div class="single-user container">
  <h1>
    U S E R
  </h1>
  <h1>
    I N F O R M A  T I O N
  </h1>
   <form @submit.prevent="updateItem" >
      <div class="field ">
        <label for="username"> Name: </label>
        <input type="text" name="username" v-model="user.username">
      </div>
      <div class="field ">
        <label for="role"> Role: </label>
        <input type="text" name="role" v-model="user.role">
      </div>
      <div class="field ">
        <label for="email"> Email: </label>
        <input type="text" name="email" v-model="user.email">
      </div>
      <div class="field ">
        <label for="phone"> Phone: </label>
        <input type="text" name="phone" v-model="user.phone">
      </div>
      <div class="field ">
        <label for="notes"> Notes: </label>
        <input type="text" name="notes" v-model="user.notes">
      </div>

      <!-- BUTTON:  -->
      <div class="field center-align">
       <button class="btn grey ">Update User</button>
      </div>
    </form>
</div>
</template>

<script>
import db from '@/firebase/init';
export default {
  name: 'SingleUser',
  data() {
    return {
      user: null,
    };
  },
  methods: {
    updateItem() {
      const docId = this.$route.params.user_id;
      const ref = db.collection('users').doc(docId);

      ref
        .update({
          username: this.user.username,
          role: this.user.role,
          email: this.user.email,
          phone: this.user.phone,
          notes: this.user.notes,
        })
        .then(() => {
          this.$router.push({ name: 'AllUsers' });
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  created() {
    //fetch data from firestore by user id
    const docId = this.$route.params.user_id;
    const ref = db.collection('users').doc(docId);
    ref
      .get()
      .then(res => {
        this.user = res.data();
      })
      .catch(err => {
        console.error(err);
      });
  },
};
</script>

<style>
.single-user h1 {
  text-align: center;
  font-size: 2em;
}
.single-user {
  margin-top: 100px;
  position: absolute;
  top: 25px;
  right: 25px;
  bottom: 25px;
  left: 175px;
  max-width: 600px;
}
</style>
