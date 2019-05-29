<template>
  <div class="clients container">
    <h1>C L I E N T S</h1>
    <router-link :to="{name: 'NewClientForm'}">
      <button>
        Add New Client
      </button>
    </router-link>
 <!-- sort by: -->
        <button @click="sortAZ('name')">
          <span>Name: A-Z</span>
        </button>
         <button @click="sortZA('name')">
          <span>Name: Z-A</span>
        </button>
    <div class="clients-grid">
    <div class="card" v-for="(client, i) in clients" :key="i">
      <div class="card-contnet">
        <i class="material-icons delete" @click="deleteItem(client.id)">
          delete
        </i>
        <h3> {{client.name}} </h3>
        <ul class="client-info">
          <li>
            {{client.industry}}
          </li>
           <li>
            {{client.email}}
          </li>
           <li>
            {{client.phone}}
          </li>
            <router-link :to="{name: 'SingleClient', params: {client_id: client.id}}">
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
  name: 'AllClients',
  data() {
    return {
      clients: [],
    };
  },
  methods: {
    deleteItem(id) {
      // delete doc rfom firestore
      db
        .collection('clients')
        .doc(id)
        .delete()
        .then(() => {
          this.clients = this.clients.filter(client => {
            return client.id !== id;
          });
        });
      console.log(id);
    },
    sortAZ(sortType) {
      console.log(sortType);
      this.clients.sort((a, b) => {
        if (a[sortType] && b[sortType]) {
          return a[sortType].toLowerCase() < b[sortType].toLowerCase() ? -1 : 1;
        }
      });
    },
    sortZA(sortType) {
      console.log(sortType);
      this.clients.sort((a, b) => {
        if (a[sortType] && b[sortType]) {
          return a[sortType].toLowerCase() < b[sortType].toLowerCase() ? 1 : -1;
        }
      });
    },
  },
  computed: {
    filteredResults: function() {
      let search = this.searchInput.seachString.toLowerCase();
      return this.clients.filter(client => {
        if (
          (client.name && client.name.toLowerCase().match(search)) ||
          (client.email && client.email.toLowerCase().match(search)) ||
          (client.phone && client.phone.toLowerCase().match(search))
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
  created() {
    db
      .collection('clients')
      .get()
      .then(collection => {
        collection.forEach(doc => {
          let client = doc.data();
          client.id = doc.id;
          this.clients.push(client);
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
.clients-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 30px;
}

.card {
  border-radius: 20px;
}
.clients h1 {
  text-align: center;
}

.clients {
  margin-top: 100px;
  position: absolute;
  top: 25px;
  right: 25px;
  bottom: 25px;
  left: 175px;
}

.clients .delete {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #aaaaaa;
}
.clients .delete:hover {
  color: rgb(219, 220, 220);
}
.clients button {
  background-color: rgb(189, 208, 228);
  margin: 10px;
}
</style>
