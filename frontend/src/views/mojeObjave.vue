<template>
  <div class="forum">
    
    
    <forumkomentari v-on:reload="SveObjave()" class="objava" v-for="objava in objave" :key="objava._id" :info="objava" /> <br>
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import forumkomentari from '@/components/forumkomentari.vue'
import Forum from '../services/forumObjava'
export default {
  name: 'mojeObjave',
  components: {
    forumkomentari
  },
  data(){
    return {
      body: {
        sadrzaj: ''
      },
      objave: [],
      error: ''
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
        let res = await Forum.mojeObjave()
        console.log(res);
        this.objave = res.data
      } catch (error) {
        this.error = error.data
      }
    }
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
</style>