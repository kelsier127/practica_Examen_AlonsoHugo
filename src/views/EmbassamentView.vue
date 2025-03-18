<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import axios from 'axios'

const route = useRoute();
const embassament = route.params.embassament;
let capacidadVolumen = 0;
let capacidadPorcentaje = 0;
let capacidadTotal = 0;
console.log(embassament);
let embassamentUrl = embassament.replaceAll(" ", '%20');

let url = `https://analisi.transparenciacatalunya.cat/resource/gn9e-3qhr.json?$query=SELECT%20%60dia%60%2C%60estaci%60%2C%60nivell_absolut%60%2C%60percentatge_volum_embassat%60%2C%60volum_embassat%60%20WHERE%20%60estaci%60%20=%20%27${embassamentUrl}%27%20ORDER%20BY%20%60dia%60%20DESC%20LIMIT%20100`
let dades = ref([])
const data = ref([])

axios
  .get(url)
  .then((response) => {
    data.value = response.data
    for (let i in data.value) {
      if (!dades.value.includes(data.value[i].estaci)) {
        console.log('yes')

        let fecha = new Date(data.value[i].dia);
        let mes = getMonth(fecha.getMonth())
        let fechaString = `${fecha.getDate()} de ${mes} de ${fecha.getFullYear()}`;
        capacidadVolumen+=parseInt(data.value[i].volum_embassat);
        capacidadPorcentaje+=parseInt(data.value[i].percentatge_volum_embassat);
        let objeto = {
          "dia": fechaString,
          "estaci": embassament,
          "nivell_absolut":data.value[i].nivell_absolut,
          "percentatge_volum_embassat": data.value[i].percentatge_volum_embassat,
          "volum_embassat": data.value[i].volum_embassat
        }
        dades.value.push(objeto)
      }
    }
    console.log(dades.value)
    capacidadTotal = (capacidadVolumen*100)/capacidadPorcentaje;
  })
  .catch((error) => {
    console.log(error)
  })

function getMonth(num){
  let mes = "";
  switch(num){
    case 0:
      mes = "Gener";
      break;
    case 1:
      mes = "Febrer";
      break;
    case 2:
      mes = "Març";
      break;
    case 3:
      mes = "Abril";
      break;
    case 4:
      mes = "Maig";
      break;
    case 5:
      mes = "Juny";
      break;
    case 6:
      mes = "Juliol";
      break;
    case 7:
      mes = "Agost";
      break;
    case 8:
      mes = "Setembre";
      break;
    case 9:
      mes = "Octubre";
      break;
    case 10:
      mes = "Novembre";
      break;
    case 11:
      mes = "Desembre";
      break;
  }
  return mes
}
</script>

<template>
<h2>{{ embassament }}</h2>
<h3>Capacidad general: {{ Math.round(capacidadTotal*100)/100 }} hm3</h3>
<div class="day" v-for="(dada,index) in dades" :key="index">
  <h3>Dia {{index+1}}: {{ dada.dia }}</h3>
  <p>Nivell Absolut: {{ dada.nivell_absolut }}</p>
  <p>Porcentaje de volumen embasado: {{ dada.percentatge_volum_embassat }} % </p>
  <p>Volumen embasado: {{ dada.volum_embassat }}</p>
</div>
</template>

<style>
.day{
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
}
</style>