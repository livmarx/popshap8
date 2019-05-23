<template>
  <div class="new-product-form container">
    <h1 class="grey-text">
      New Product Form
    </h1>
    <form @submit.prevent="addItem" >
      <div class="field ">
        <label for="clientName"> Client Name: </label>
        <input type="text" name="clientName" v-model="clientName">
      </div>
      <div class="field ">
        <label for="color"> Color: </label>
        <input type="text" name="color" v-model="color">
      </div>
      <div class="field ">
        <label for="controls"> Controls: </label>
        <input type="text" name="controls" v-model="controls">
      </div>
      <div class="field ">
        <label for="deviceType"> Device Type: </label>
        <input type="text" name="deviceType" v-model="deviceType">
      </div>
      <div class="field ">
        <label for="manufacturerName"> Manufacturer Name: </label>
        <input type="text" name="manufacturerName" v-model="manufacturerName">
      </div>
      <div class="field ">
        <label for="serialNumber"> Serial Number: </label>
        <input type="text" name="serialNumber" v-model="serialNumber">
      </div>
      <div class="field ">
        <label for="size"> Size: </label>
        <input type="text" name="size" v-model="size">
      </div>
      <div class="field ">
        <label for="sku"> SKU: </label>
        <input type="text" name="sku" v-model="sku">
      </div>
      <div class="field ">
        <label for="status"> Status: </label>
        <input type="text" name="status" v-model="status">
      </div>

      <!-- BUTTON:  -->
      <div class="field center-align">
       <button class="btn grey ">Add Product</button>
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
      clientName: null,
      color: null,
      controls: null,
      deviceType: null,
      manufacturerName: null,
      serialNumber: null,
      size: null,
      sku: null,
      status: null,
    };
  },
  methods: {
    addItem() {
      db
        .collection('inventory')
        .add({
          clientName: this.clientName,
          color: this.color,
          controls: this.controls,
          deviceType: this.deviceType,
          manufacturerName: this.manufacturerName,
          serialNumber: this.serialNumber,
          size: this.size,
          sku: this.sku,
          status: this.status,
        })
        .then(() => {
          this.$router.push({ name: 'AllProducts' });
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
.new-product-form h1 {
  text-align: center;
  font-size: 2em;
}

.new-product-form {
  margin-top: 100px;
  position: absolute;
  top: 25px;
  right: 25px;
  bottom: 25px;
  left: 175px;
  max-width: 600px;
}
</style>
