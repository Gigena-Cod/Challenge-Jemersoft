<template>
  <div id="pokemons-list">
    <div v-if="loading" class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-orange-500 hover:bg-orange-400 transition ease-in-out duration-150 cursor-not-allowed">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Cargando...
    </div>

    <div v-else id="list-pokemons" class="flex list-items max-w-7xl mx-auto flex gap-y-8 flex-wrap scroll-smooth">

      <div v-for="(pokemon,index) in pokemons" :key="index" :id="`pokemon${pokemon.id}`" class="p-4 rounded hover:scale-105 transition ease-in-out delay-150 shadow-lg duration-300 w-custom">
        <div class="image bg-gradient-to-b rounded from-gray-400">
          <img loading="lazy" :src="pokemon.sprites.other.home.front_default" :alt="`Image ${pokemon.name}`" class="h-56 w-auto mx-auto">
        </div>

        <!-- TYPES  -->
        <div class="types flex mt-4 gap-x-1">
          <span class="font-bold label">
            Types:
          </span>
          <div class="value">
            {{generatorTypesNames(pokemon.types)}}
          </div>
        </div>

        <!-- WEIGHT  -->
        <div class="weight flex gap-x-1">
          <span class="font-bold label">
            Weight:
          </span>
          <div class="value">
            {{pokemon.weight}}
          </div>
        </div> 

        <router-link :to="{ name: 'viewDetail', params: { id: pokemon.id }}"  class="hover:bg-orange-600  transition ease-in-out  bg-orange-500 text-white mt-2 rounded h-10 w-full flex justify-center items-center button-link">
          Más información
        </router-link>          
        
      </div>      

    </div>
    <button v-if="!loading && buttonScroll" @click="scroll()" class="transition ease-in-out delay-150  duration-300 hover:scale-105 rounded text-white w-56 my-4 h-12 flex items-center mx-auto  bg-orange-500 hover:shadow-lg hover:bg-orange-500 justify-center mostrar-mas">
      Mostrar más
    </button>

  </div>
</template>

<script>
import request from "@/data/request";

export default {
    name:"listPokemons",
    data(){
      return{
        pokemons:[],
        page:1,
        loading:true,
        buttonScroll:true
      }
    },
    async created(){
      
      this.pokemons = await request.obtenerPokemones(this.page)

      if(this.pokemons.length!=0) {
        this.loading=false
      }
    },
    methods:{
      scroll() {
        this.buttonScroll= false;

          window.onscroll = async() => {

          console.log(document.documentElement.scrollTop + " + " + window.innerHeight);
          console.log(document.documentElement.offsetHeight - 10);

          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;
          if (bottomOfWindow ) {

            this.page++
            console.log(this.page)
            let newPokemons = await request.obtenerPokemones(this.page)
            newPokemons.map( pokemon => this.pokemons.push(pokemon))
          }
          
        };
      },

      capitalizeString(string) { 
          let newString= string[0].toUpperCase() +  string.slice(1); 
          return newString
      },
      generatorTypesNames(parameter){

        let typesNames = []
        
        parameter.map( types => {
          typesNames.push(this.capitalizeString(types.type.name))
        })

        return typesNames.join()
      }
    }
}   
</script>

<style>
.w-custom{
  width: 100%;
}


@media screen and (min-width:48rem){
  
  .w-custom{
    width: 49%;
  }

  #list-pokemons{
    column-gap: calc(100% - 98%);
  }

}

@media screen and (min-width:64rem){
  
  .w-custom{
    width: 32%;
  }

#list-pokemons{
    column-gap: calc((100% - 96%)/2);
  }
}

@media screen and (min-width:80rem){
  
  .w-custom{
    width: 24%;
  }

#list-pokemons{
    column-gap: calc((100% - 96%)/3);
  }
}
</style>