<template>
  <div class="forum">
    <h1>Forum</h1>
    <h5 v-if="!$store.user">Ukoliko zelite sudjelovati u raspravama morate biti prijavljeni</h5> <br>
    <p class="error" v-if="$store.objave.length === 0">{{error}}</p>
    <div class="col-sm">
      <div v-if="$store.user" class="w-80 p-3" style="background-color: #eee;">
            <div class="slikicaprofila"></div>
            
           <div class="form-group">
                      <input v-model="body.sadrzaj" type="text" placeholder="Unesi što te zanima ili ti nije jasno?"  class="form-control">
                    </div> <br>
<div>
                      <a @click="Objavi()" class=" btn btn-info my-2 my-sm-0 mr-2">Dodaj</a>
                    </div>

      </div>
    </div> <br> 
    <forumkomentari class="objava" v-for="objava in $store.objave" :key="objava._id" :info="objava" /> <br>

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
</template>

<script>
// @ is an alias to /src
import forumkomentari from '@/components/forumkomentari.vue'
import Forum from '../services/forumObjava'
import store from '@/store.js'
export default {
  name: 'forum',
  components: {
    forumkomentari
  },
  data(){
    return {
      body: {
        sadrzaj: ''
      },
      objave: [],
      error: '',
      stranica: 0
    }
  },
  async created() {
    await this.SveObjave()
  },
  methods: {
    async Objavi(){
      try {
        let res = await Forum.DodajObjavu(this.body)
        console.log(res);
        await this.SveObjave()
      } catch (error) {
        this.error = error.data.error
      }
    },
    async SveObjave(){
      try {
        let res = await Forum.SveObjave(this.$store.forumPretraga, this.stranica)
        console.log(res);
        this.$store.objave = res.data.objave
      } catch (error) {
        this.stranica--
        this.error = error.data
      }
    },
    async next(){
      this.stranica++
      await this.SveObjave()      
    },
    async prev(){
      this.stranica = --this.stranica < 0 ? 0 : this.stranica
      await this.SveObjave()
    },
  },
}
</script>

<style lang="css" scoped>
  .objava{
    margin: 20px 0 20px 0;
  }

  .error{
    color: red;
  }

  .pag{
    width: 100%;
  }
</style>