<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'


const data = ref([])

let url = 'https://analisi.transparenciacatalunya.cat/resource/gn9e-3qhr.json'

let embassaments = ref([])

axios
  .get(url)
  .then((response) => {
    data.value = response.data
    for (let i in data.value) {
      if (!embassaments.value.includes(data.value[i].estaci)) {
        console.log('yes')
        embassaments.value.push(data.value[i].estaci)
      }
    }
  })
  .catch((error) => {
    console.log(error)
  })
</script>

<template>
  <h2 class="title">Water view</h2>
  <ul class="embassament-list">
    <li v-for="embassament in embassaments" :key="embassament" class="embassament-item">
      <RouterLink :to="`/water/${embassament}`">{{ embassament }}</RouterLink>
    </li>
  </ul>
</template>

<style>

</style>
