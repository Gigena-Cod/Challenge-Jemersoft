<template>
  <div class="home">
    <ListPokemons/>
  </div>
</template>

<script>
// @ is an alias to /src
import ListPokemons from '@/components/ListPokemons.vue'

export default {
  name: 'HomeView',
  components: {
    ListPokemons
  }
}
</script>
