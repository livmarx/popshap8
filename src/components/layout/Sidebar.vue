<template>
  <div class="side-bar">
      <ul class="nav-links">
          <router-link :to="{name: 'Home'}" tag="li">
            Dashboard
          </router-link>
          <router-link :to="{name: 'AllUsers'}" tag="li">
            Users
          </router-link>
          <router-link :to="{name: 'AllClients'}" tag="li">
            Clients
          </router-link>
          <router-link :to="{name: 'AllProducts'}" tag="li">
            Products
          </router-link>
          <router-link :to="{name: 'Settings'}" tag="li">
            Settings
          </router-link>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Sidebar',
    };
  },
};
</script>

<style>
.side-bar {
  margin-top: 94px;
  height: 100%;
  width: 150px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
  background-color: rgb(136, 156, 177);
  padding: 10px;
  box-shadow: 1px 1px 8px #454966;
}
h5 {
  margin: 0;
}
.nav-links {
  margin: 5px;
}

a {
  text-decoration: none;
}

li {
  padding: 10px;
}

li:hover {
  color: #454966;
  cursor: pointer;
}
</style>
