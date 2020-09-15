 <!--  -->
 
<template>
  <div class="naslovnica">
      
      <div class="row recepti">     
        <div>
          <karticerecepata v-on:reload="receptiUsera()" class="recept" v-for="k in recepti" :info="k" :key="k._id" /> 
        </div>  
      <div v-if="recepti.length>0" class="pag">  
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

import Recept from '@/services/recept.js'
import karticerecepata from '@/components/karticerecepata.vue'
import store from '@/store.js'
export default {
  name:"recepti",
  components: {
    karticerecepata
  },
  data(){
    return{
      recepti: [],
      stranica: 0
    }
  },
  async created() {
    await this.receptiUsera()
  },
  methods:{
    async receptiUsera(){
      try {
        let res = await Recept.UserRecepti(this.stranica)
        console.log(res);
        if(res.data.length===0) return this.stranica--
        this.recepti = res.data
      } catch (error) {
        this.stranica--
        console.log(error);
      }
    },
    async next(){
      this.stranica++
      await this.receptiUsera()      
    },
    async prev(){
      this.stranica = --this.stranica < 0 ? 0 : this.stranica
      await this.receptiUsera()
    },
     

  }

  

}
</script>

<style scoped>
.recept{
    margin: 0 300px 0 300px;
  }

  .recepti{
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

