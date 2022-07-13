// AXIOS   
import axios from 'axios'
const API="https://pokeapi.co/api/v2"

export default {
  
  // OBTENER TODOS LOS POKEMONES 
  async obtenerPokemones(page) {
    try {
        let idMin;

        if(page==1){
           idMin = ( page - 1 ) * 16 + 1 
        }
        else{
          idMin = page  * 16 + 1;
        }
        
        let idMax = idMin + 16;

        let newPokemons = []
        for (let id = idMin; id < idMax; id++) {

          let response = await axios.get(`${API}/pokemon/${id}`);
          let result = await response.data;

          newPokemons.push(result)          
        }

        return newPokemons

    } 
    catch (error) {
        console.log(error);
        console.log(`error al cargar pokemones pagina ${page}`);
    }
  },
  
  // OBTENER POKEMON POR ID 
  async obtenerPokemonPorId(id) {
    
    try {
      let response = await axios.get(`${API}/pokemon/${id}`);
      let result = await response.data;
      return result    
    } 
    catch (error) {
        console.log(error);
    }
  }
}