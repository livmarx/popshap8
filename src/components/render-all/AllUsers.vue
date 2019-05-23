<template>
  <div class="users container">
    <h1>U S E R S</h1>
     <!-- <router-link :to="{name: 'NewUserForm'}">
      <button>
        Add New User
      </button>
    </router-link> -->
    <div class="users-grid">
      <div class="card" v-for="(user, i) in users" :key="i">
        <div class="card-contnet">
           <i class="material-icons delete" @click="deleteItem(user.id)">
          delete
        </i>
          <h3> {{user.username}} </h3>
          <ul class="client-info">
            <li v-if="user.role">
              {{user.role}}
            </li>
            <li v-if="user.email">
              {{user.email}}
            </li>
            <li v-if="user.phone">
              {{user.phone}}
            </li>
            <li v-if="user.notes">
              Notes:
              <br/>
              {{user.notes | snippet}}
            </li>
               <router-link :to="{name: 'SingleUser', params: {user_id: user.id}}">
              <button class="more-info">
                More Info
              </button>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '@/firebase/init.js';

export default {
  name: 'AllUsers',
  data() {
    return {
      users: [],
    };
  },
  methods: {
    deleteItem(id) {
      // delete doc rfom firestore
      db
        .collection('users')
        .doc(id)
        .delete()
        .then(() => {
          this.users = this.users.filter(user => {
            return user.id !== id;
          });
        });
      console.log(id);
    },
  },
  created() {
    db
      .collection('users')
      .get()
      .then(collection => {
        collection.forEach(doc => {
          let user = doc.data();
          user.id = doc.id;
          this.users.push(user);
        });
      });
  },
};
</script>
<style>
h3 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
  color: rgb(84, 101, 117);
}
.card-contnet {
  padding: 15px;
}
.users-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 30px;
}

.card {
  border-radius: 20px;
}
.users h1 {
  text-align: center;
}

.users {
  margin-top: 100px;
  position: absolute;
  top: 25px;
  right: 25px;
  bottom: 25px;
  left: 175px;
}

.users .delete {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #aaaaaa;
}
.users .delete:hover {
  color: rgb(219, 220, 220);
}
.users button {
  background-color: rgb(189, 208, 228);
  margin: 10px;
}
</style>
