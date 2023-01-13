<template>
  <div id="pokemons-list">
    <Loading v-if="loading" />
    <div
      v-else
      id="list-pokemons"
      class="flex list-items max-w-7xl mx-auto flex gap-y-8 flex-wrap scroll-smooth"
    >
      <CardPokemon v-for="(pokemon, index) in pokemons" :key="index" :pokemon="pokemon" />
    </div>
    <button
      v-if="!loading && buttonScroll"
      @click="scroll()"
      class="transition ease-in-out delay-150 duration-300 hover:scale-105 rounded text-white w-56 my-4 h-12 flex items-center mx-auto bg-orange-500 hover:shadow-lg hover:bg-orange-500 justify-center mostrar-mas"
    >
      Mostrar más
    </button>
  </div>
</template>

<script>
import request from "@/data/request";
import CardPokemon from "./PokemonCard.vue";
import Loading from "./Loading.vue";

export default {
  name: "listPokemons",
  components: {
    CardPokemon,
    Loading,
  },
  data() {
    return {
      pokemons: [],
      page: 1,
      loading: true,
      buttonScroll: true,
    };
  },
  async created() {
    this.pokemons = await request.obtenerPokemones(this.page);

    if (this.pokemons.length != 0) {
      this.loading = false;
    }
  },
  methods: {
    scroll() {
      this.buttonScroll = false;

      window.onscroll = async () => {
        console.log(document.documentElement.scrollTop + " + " + window.innerHeight);
        console.log(document.documentElement.offsetHeight - 10);

        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.page++;
          console.log(this.page);
          let newPokemons = await request.obtenerPokemones(this.page);
          newPokemons.map((pokemon) => this.pokemons.push(pokemon));
        }
      };
    },

    capitalizeString(string) {
      let newString = string[0].toUpperCase() + string.slice(1);
      return newString;
    },
    generatorTypesNames(parameter) {
      let typesNames = [];

      parameter.map((types) => {
        typesNames.push(this.capitalizeString(types.type.name));
      });

      return typesNames.join();
    },
  },
};
</script>

<style>
.w-custom {
  width: 100%;
}

@media screen and (min-width: 48rem) {
  .w-custom {
    width: 49%;
  }

  #list-pokemons {
    column-gap: calc(100% - 98%);
  }
}

@media screen and (min-width: 64rem) {
  .w-custom {
    width: 32%;
  }

  #list-pokemons {
    column-gap: calc((100% - 96%) / 2);
  }
}

@media screen and (min-width: 80rem) {
  .w-custom {
    width: 24%;
  }

  #list-pokemons {
    column-gap: calc((100% - 96%) / 3);
  }
}
</style>
