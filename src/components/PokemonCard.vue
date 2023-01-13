<template>
  <div
    :id="`pokemon${pokemon.id}`"
    class="border p-4 rounded-md transition ease-in-out delay-150 hover:shadow-lg duration-300 w-custom"
  >
    <div class="image bg-gradient-to-b rounded from-gray-400">
      <img
        loading="lazy"
        :src="pokemon.sprites.other.home.front_default"
        :alt="`Image ${pokemon.name}`"
        class="h-56 w-auto mx-auto"
      />
    </div>

    <!-- TYPES  -->
    <div class="types flex mt-4 gap-x-1">
      <span class="font-bold label"> Types: </span>
      <div class="value">
        {{ generatorTypesNames(pokemon.types) }}
      </div>
    </div>

    <!-- WEIGHT  -->
    <div class="weight flex gap-x-1">
      <span class="font-bold label"> Weight: </span>
      <div class="value">
        {{ pokemon.weight }}
      </div>
    </div>

    <router-link
      :to="{ name: 'viewDetail', params: { id: pokemon.id } }"
      class="hover:bg-orange-600 transition ease-in-out bg-orange-500 text-white mt-2 rounded h-10 w-full flex justify-center items-center button-link"
    >
      Más información
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CardPokemon",
  props: ["pokemon"],
  data() {
    return {};
  },
  methods: {
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
