<template>
<div class="single-product">
  <h1>
    P R O D U C T
  </h1>
  <h1>
    I N F O R M A  T I O N
  </h1>
  <form @submit.prevent="updateItem" >
      <div class="field ">
        <label for="clientName"> Client Name: </label>
        <input type="text" name="clientName" v-model="product.clientName">
      </div>
      <div class="field ">
        <label for="color"> Color: </label>
        <input type="text" name="color" v-model="product.color">
      </div>
      <div class="field ">
        <label for="controls"> Controls: </label>
        <input type="text" name="controls" v-model="product.controls">
      </div>
      <div class="field ">
        <label for="deviceType"> Device Type: </label>
        <input type="text" name="deviceType" v-model="product.deviceType">
      </div>
      <div class="field ">
        <label for="manufacturerName"> Manufacturer Name: </label>
        <input type="text" name="manufacturerName" v-model="product.manufacturerName">
      </div>
      <div class="field ">
        <label for="serialNumber"> Serial Number: </label>
        <input type="text" name="serialNumber" v-model="product.serialNumber">
      </div>
      <div class="field ">
        <label for="size"> Size: </label>
        <input type="text" name="size" v-model="product.size">
      </div>
      <div class="field ">
        <label for="sku"> SKU: </label>
        <input type="text" name="sku" v-model="product.sku">
      </div>
      <div class="field ">
        <label for="status"> Status: </label>
        <input type="text" name="status" v-model="product.status">
      </div>

      <!-- BUTTON:  -->
      <div class="field center-align">
       <button class="btn grey ">Update Product</button>
      </div>
    </form>

</div>
</template>

<script>
import db from '@/firebase/init.js';
export default {
  name: 'SingleProduct',
  data() {
    return {
      product: null,
    };
  },
  methods: {
    updateItem() {
      const docId = this.$route.params.product_id;
      const ref = db.collection('inventory').doc(docId);

      ref
        .update({
          clientName: this.product.clientName,
          color: this.product.color,
          controls: this.product.controls,
          deviceType: this.product.deviceType,
          manufacturerName: this.product.manufacturerName,
          serialNumber: this.product.serialNumber,
          size: this.product.size,
          sku: this.product.sku,
          status: this.product.status,
        })
        .then(() => {
          this.$router.push({ name: 'AllProducts' });
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  created() {
    //fetch data from firestore by product id
    const docId = this.$route.params.product_id;
    const ref = db.collection('inventory').doc(docId);
    ref
      .get()
      .then(res => {
        this.product = res.data();
      })
      .catch(err => {
        console.error(err);
      });
  },
};
</script>

<style>
h1 {
  text-align: center;
}
.single-product {
  margin-top: 100px;
  position: absolute;
  top: 25px;
  right: 25px;
  bottom: 25px;
  left: 175px;
}
</style>
