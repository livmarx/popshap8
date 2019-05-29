<template>
  <div class="settings">
    <h1>
      S E T T I N G S
    </h1>
    <!-- <div class="sizes">
      {{this.sizes}}
    </div> -->
    <div class="colors">
      color: {{this.colors}}
    </div>
    <br/>
    <div class="sizes">
      {{this.sizes}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '@/firebase/init.js';

export default {
  name: 'Settings',
  data() {
    return {
      colors: [],
      sizes: [],
      deviceTypes: [],
    };
  },
  created() {
    console.log('In the created hook');
    // colors
    db
      .collection('colors')
      .get()
      .then(collection => {
        collection.forEach(doc => {
          let color = doc.data();
          color.id = doc.id;
          console.log('COLOR: ', color);
          this.colors.push(color);
        });
        console.log('this.colors: ', this.colors);
      });
    // sizes:
    db
      .collection('sizes')
      .get()
      .then(collection => {
        collection.forEach(doc => {
          let size = doc.data();
          size.id = doc.id;
          console.log('Size: ', size);
          this.sizes.push(size);
        });
        console.log('this.colors: ', this.sizes);
      });
  },
};
</script>

<style>
.settings {
  margin-top: 100px;
  position: absolute;
  top: 25px;
  right: 25px;
  bottom: 25px;
  left: 175px;
}
</style>
