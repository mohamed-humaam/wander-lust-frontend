<template>
  <div>
    <h2>PRODUCTS</h2>
    <p>Product details for {{ id }}</p>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  font-size: 36px;
}

p {
  margin: 20px 0;
}
</style>
