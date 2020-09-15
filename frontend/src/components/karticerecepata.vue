<template>
  <div class="hello">
    <div class="card">  
      <router-link :to="{ name: 'receptPodaci', params: {id: info._id, edit: $route.name} }">          
          <img  class="card-img-top custom-img" :src="url" alt="Slika"/>
          <div class="footer">
            <div class="naslov text-left">{{info.naziv}}</div>
            <div class="objavljeno text-left">Objavljeno: {{new Date(info.createdAt).getDate()}}.{{new Date(info.createdAt).getMonth()}}.{{new Date(info.createdAt).getFullYear()}}</div>
            <div class="opis">{{info.opis}}</div>
          </div>
      </router-link>          
    </div>
  <div class="brisi" v-if="$route.name === 'recepti'"  @click.prevent="ObrisiRecept(info._id)">Obriši recept</div> 
  </div>
</template>

<script>
import Recept from '../services/recept'
export default {
  name: 'karticerecepata',
  props: ["info"],
  data(){
    return{
      url: '',
      blob: '',
      pic: false
    }
  },
  async created() {  
    let res = await Recept.ReceptSlika(this.info._id)
    if(res.data.size !== 0) this.pic = true
    this.url = `${res.config.baseURL}/recept/${this.info._id}/slika`

  },
  methods: {
    async ObrisiRecept(id){
      try {
        let res = await Recept.Obrisi(id)
        console.log(res);
        this.$emit('reload')
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.brisi{
  position: relative;
  top: -30px;
  cursor: pointer;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.card-body{
  background-color: var(--bg);
  border-radius: 50px 50px 0 0;
}

img{
  object-fit: contain ;
  border-radius: 20px 20px 30px 30px;
}

a:hover .opis{
  display: inline;
  transition: 1s;
}
a:hover .objavljeno{
  border-radius: 0px;
}

.footer{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
}

.naslov{
  font-size: 24px;
  color: white;
  background-color:  rgba(0, 0, 0, 0.65);
  grid-column-start: 1;
  grid-column-end: 6;
  padding-left: 10px;
  border-radius: 10px 10px 0 0;
}

.objavljeno{
  grid-column-start: 1;
  grid-column-end: 6;
  font-size: 20px;
  color: white;
  background-color:  rgba(0, 0, 0, 0.65);
  padding-left: 20px;
  border-radius: 0 0 30px 30px;
}

.opis{
  grid-column-start: 1;
  grid-column-end: 6;
  font-size: 26px;
  color: white;
  background-color:  rgba(0, 0, 0, 0.65);
  border-radius: 0 0 30px 30px;
  padding-left: 20px;
  display: none;
}

.card{
  margin-bottom: 30px;
  border-radius: 50px;
  position: relative;
}

// .delete{
//   color: var(--text);
//   background-color: var(--bg);
//   border-radius: 0 0 50px 0;
//   cursor: pointer;
// }
</style>
