<template>
  <div class="naslovnica">
      
    <slideRecepti />
    <p class="error">{{error}}</p>
      <div class="row recepti">     
        <div>
          <karticerecepata class="recept" v-for="k in $store.recepti" :info="k" :key="k._id" /> 
        </div>  
      <div v-if="$store.recepti.length>0" class="pag">  
        <nav aria-label="Page navigation example">
          <ul class="d-flex pagination justify-content-center">
            <li @click.prevent="prev()" class="page-item">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">{{stranica+1}}</a></li>
            <li @click.prevent="next()" class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav> 
      </div>   
      </div>
    </div>
  
  
</template>
<script>
import karticerecepata from '@/components/karticerecepata.vue' 
import slideRecepti from '@/components/slideRecepti.vue' 
import store from '@/store.js'
import Recept from '../services/recept'

export default {
  name:"naslovnica",
  components: {
    karticerecepata,
    slideRecepti
  },
  data(){
    return{
      rndRecepti: [],
      error: '',
      stranica: 0,
    }  
  },
  async created() {
    await this.getAllRecepti()
    // await this.randomRecepti()
  },
  methods: {
    async next(){
      this.stranica++
      await this.getAllRecepti()      
    },
    async prev(){
      this.stranica = --this.stranica < 0 ? 0 : this.stranica
      await this.getAllRecepti()
    },
    async getAllRecepti(){
      try {
        let res = await Recept.SviRecepti(this.$store.receptPretraga, this.stranica, false)
        this.$store.recepti = res.data.recepti
      } catch (error) {
        this.stranica--
        this.error = error.data
        console.log(error);
      }
    }
  },     
}
</script>

<style lang="css" scoped>
  .recept{
    margin: 0 300px 0 300px;
  }

  .recepti{
    width: 70%;
    margin: auto !important;
    margin-top: 50px !important;
  }

  .row{
    margin: 0px;
  }

  .pag{
    width: 100%;
  }
  .error{
    color: red
  }
  img{
  height: 90vh;
}

  @media only screen and (max-width: 991px){
    .recept{
    margin: 0 10% 0 10%;
    }
  }
  @media only screen and (max-width: 450px){
    .recept{
    margin: 0 2% 0 2%;
    }
  }
</style>