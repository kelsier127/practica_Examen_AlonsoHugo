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
.title {
  font-family: 'Arial', sans-serif;
  text-align: center;
  font-size: 2.5rem;
  color: #4caf50;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.embassament-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(135deg, #00c6ff, #0072ff); /* Azul */
  border-radius: 15px;
  padding: 20px;
}

.embassament-item {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
  cursor: pointer;
}

.embassament-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1);
  background-color: #0072ff; /* Azul */
  color: #fff;
}

.embassament-item:active {
  transform: translateY(2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>
