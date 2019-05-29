<template>
  <div class="products container">
    <h1>P R O D U C T S</h1>
     <router-link :to="{name: 'NewProductForm'}">
      <button>
        Add New Product
      </button>
    </router-link>
     <!-- Sort by: -->
        <button @click="sortAZ('clientName')">
          <span>Client Name: A-Z</span>
        </button>
         <button @click="sortZA('clientName')">
          <span>Client Name: Z-A</span>
        </button>
    <div class="products-grid">
      <div class="card" v-for="(product, i) in products" :key="i">
        <div class="card-contnet">
           <i class="material-icons delete" @click="deleteItem(product.id)">
          delete
        </i>
          <h3> {{product.deviceType}} </h3>
          <ul class="product-info">
            <li>
              {{product.clientName}}
            </li>
            <li>
              {{product.controls}}
            </li>
            <li>
              {{product.color}}
            </li>
            <li>
              {{product.manufacturerName}}
            </li>
            <li>
              {{product.serialNumber}}
            </li>
            <li>
              {{product.size}}
            </li>
            <li>
              {{product.sku}}
            </li>
            <li>
              {{product.status}}
            </li>
               <router-link :to="{name: 'SingleProduct', params: {product_id: product.id}}">
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
  name: 'AllProducts',
  data() {
    return {
      products: [],
    };
  },
  methods: {
    deleteItem(id) {
      // delete doc from firestore
      db
        .collection('inventory')
        .doc(id)
        .delete()
        .then(() => {
          this.products = this.products.filter(product => {
            return product.id !== id;
          });
        });
      console.log(id);
    },
    sortAZ(sortType) {
      console.log(sortType);
      this.products.sort((a, b) => {
        if (a[sortType] && b[sortType]) {
          return a[sortType].toLowerCase() < b[sortType].toLowerCase() ? -1 : 1;
        }
      });
    },
    sortZA(sortType) {
      console.log(sortType);
      this.products.sort((a, b) => {
        if (a[sortType] && b[sortType]) {
          return a[sortType].toLowerCase() < b[sortType].toLowerCase() ? 1 : -1;
        }
      });
    },
  },
  created() {
    db
      .collection('inventory')
      .get()
      .then(collection => {
        collection.forEach(doc => {
          let product = doc.data();
          product.id = doc.id;
          this.products.push(product);
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
.products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 30px;
}

.card {
  border-radius: 20px;
}
.products h1 {
  text-align: center;
}

.products {
  margin-top: 100px;
  position: absolute;
  top: 25px;
  right: 25px;
  bottom: 25px;
  left: 175px;
}
.products .delete {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #aaaaaa;
}
.products .delete:hover {
  color: rgb(219, 220, 220);
}
.products button {
  background-color: rgb(189, 208, 228);
  margin: 10px;
}
</style>
