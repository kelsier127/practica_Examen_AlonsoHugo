<script setup></script>

<template>
  <nav>
    <h1 class="titulo">Esto es el titulo de la pagina</h1>
    <div class="navContainer">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/water">Water</RouterLink>
      <RouterLink to="/carrito">Carrito</RouterLink>
    </div>
  </nav>

  <RouterView class="aplicacion"/>
</template>

<style scoped>
.aplicacion{
  padding: 10px;
}
.titulo {
  width: 20%;
}
nav {
  display: flex;
  padding: 1rem;
  align-items: center;
  background-color: #f1f1f1;
  margin-bottom: 1rem;
}

.navContainer{
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: space-around;
}

</style>
