<template>
  <div id="pokemon" class="mx-auto max-w-7xl">
    <div v-if="loading" class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-orange-500 hover:bg-orange-400 transition ease-in-out duration-150 cursor-not-allowed">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Cargando...
    </div>
    <div v-else class="flex flex-wrap container-custom mb-4  pokemon">
        <div class="w-full text-white title gap-x-2 rounded flex items-center justify-center h-16 bg-orange-500">
            <span class="font-bold text-3xl uppercase">
                {{pokemon.name}}
            </span>
            <span class="font-bold text-3xl uppercase">
            {{  pokemon.id | FormatId}}
            </span>
        </div>

        <div class="w-full md:w-1/2 firts-section">
            <div class="w-full image">
                <img :src="pokemon.sprites.other.home.front_default " alt="`Image-`" class="w-auto mx-auto h-96">
            </div>
        </div>
        <div class="w-full md:w-1/2 second-section">
            
            <div class="w-full flex flex-wrap mt-4 justify-between gap-y-4 features">
                
                <div class=" feature flex flex-col w-2/5 items-start types">
                    <span class="font-bold text-2xl title">
                        Tipos
                    </span>                    
                    <hr class="bg-black w-full mb-2">                    
                    <ul class="values">
                        <li v-for="(Types,index) in generatorTypesNames(pokemon.types)" :key="index" class="text-left">
                            {{Types}}
                        </li>                    
                    </ul>
                    
                </div>
                
                <div class=" feature flex flex-col w-2/5 items-start ability">
                    <span class="font-bold text-2xl title">
                        Habilidades
                    </span>                    
                    <hr class="bg-black w-full mb-2">
                    <ul class="values">
                        <li v-for="(Abilities,index) in generatorAbilitiesNames(pokemon.abilities)" :key="index" class="text-left">
                            {{Abilities}}
                        </li>                    
                    </ul>
                    
                </div>
                <div @click="back()" class="hover:bg-orange-600  transition ease-in-out  bg-orange-500 text-white  rounded h-10 mt-4  w-40 flex justify-center items-center  ml-auto button cursor-pointer">
                    Ir a la Pokédex
                </div>

                
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import request from "@/data/request";

export default {
    name:'PokemonView',
    data(){
        return{
            pokemon:{},
            loading:true
        }
    },
    async mounted(){
        this.pokemon=await request.obtenerPokemonPorId(this.$route.params.id)
        this.loading=false   
    },
    created(){
        
    },
    methods:{

        back(){
            this.$router.go(-1)
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

            return typesNames
        },
        generatorAbilitiesNames(parameter){

            let abilitiesNames = []
            
            parameter.map( abilities => {
            abilitiesNames.push(this.capitalizeString(abilities.ability.name))
            })

            return abilitiesNames
        },
    },
    filters:{         
        FormatId(id){   
            let string =`${id}`          
            return `N.º${string.padStart(3, "0")}` 
        }
    }
}
</script>

<style>
.container-custom {
    padding-left:1rem ;
    padding-right:1rem ;
}

@media screen and (min-width:82rem) {
    .container-custom {
        padding-left:unset ;
        padding-right:unset ;
    }
}
</style>