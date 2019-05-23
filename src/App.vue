<template>
  <div id="app">
    <Navbar />
    <div class="non-nav">
      <Sidebar />
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
  },
};
</script>

<style>
#app {
  margin: auto;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: rgb(161, 186, 212); */
}
.non-nav {
  display: flex;
}
</style>
