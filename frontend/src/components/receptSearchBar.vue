<template>
   <div class="pretraga">
              <form class="form-inline my-2 my-lg-0 mr-auto ml-5">
                  <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="Pretraži recepte" aria-label="Search">
               </form>
            </div>
</template>


<script>
import Recept from '@/services/recept'
import _ from 'lodash'
export default {
   data(){
      return{
         search: ''
      }
   },
   watch: {
      search:
         _.debounce(async function(val) {
            this.$store.receptPretraga = val
            try {
               let res = await Recept.SviRecepti(val, this.stranica, false)
               console.log(res);
               this.$store.recepti = res.data.recepti
            } catch (error) {
               console.log(error);
            }
         }, 500)
   },
}
</script>