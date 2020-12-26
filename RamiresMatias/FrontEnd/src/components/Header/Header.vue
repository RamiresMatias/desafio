<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <router-link class="nav-item" tag="li" to="/"
              ><a class="nav-link">Home</a></router-link
            >
            <router-link class="nav-item" tag="li" to="/pessoa"
              ><a class="nav-link">Pessoas</a></router-link
            >
            <router-link class="nav-item" tag="li" to="/animal"
              ><a class="nav-link">Animais</a></router-link
            >
            <router-link class="nav-item" tag="li" to="/lote"
              ><a class="nav-link">Lote</a></router-link
            >
            <router-link class="nav-item" tag="li" to="/alocarxanimal"
              ><a class="nav-link">Alocar Animais</a></router-link
            >
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>