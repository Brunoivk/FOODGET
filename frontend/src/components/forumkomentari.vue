<template>
    <div>
        <div >
           
            <div class="container">
  <div class="row">
    
    <div class="col-sm">
      <div class="w-80 p-3" style="background-color: #eee;">
            <!-- <span class="slikicaprofila float-left"></span> -->
            <h5>Objavio: {{info.email}}</h5> <br>
            <router-link :to="{ name: 'objavaPodaci', params: {id: info._id} }"> 
              <div class="border w-90 p-3 ">
                <h6>{{info.sadrzaj}}</h6>
              </div>
            </router-link>
            <div class="brisi" v-if="$route.name === 'mojeObjave'"  @click.prevent="ObrisiObjavu(info._id)">Obriši objavu</div>
      </div>
      
    </div>
    
  </div>
</div>

        </div>
        
    </div>
</template>

<script>
import Forum from '../services/forumObjava'
import store from '@/store.js'
export default {
    props: ["info"],
    data(){
      return store;
    },
    methods: {
      async ObrisiObjavu(){
        try {
         let res = await Forum.Obrisi(this.info._id)
         console.log(res);
         this.$emit('reload')
        } catch (error) {
          console.log(error);
        }
      }
    },
    


}
</script>

<style scoped>
.slikicaprofila {
  
     height: 50px;
  width:50px;
  background-color: black;
  border-radius: 50%;
  display: inline-block;
  /* float: left; */

}
.brisi{
  cursor: pointer;
}
.delete{
  cursor: pointer;
}
</style>