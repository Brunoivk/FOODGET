<template>
  <div class="recepti">

<h1>Podatci o receptu</h1>
    
<div>
<div class="modal-header">
</div>

    
</div>
      <div class="modal-body">
          <div class="row">
            <div class="col-md-2 form-group"></div>
            <div class="col-md-8 form-group">
            <img :src="url" alt="">
            </div>
            <div class="col-md-2 form-group"></div>
          </div>

          <div class="row">
            <div class="col-md-4"></div>

            <div class="col-md-4">
              <p class="error">{{receptError}}</p>
              <div class="form-group">Naziv
                <input v-model="podaci.naziv" type="text" placeholder="Naziv recepta"  class="form-control">
              </div>

              <div class="form-group "> Opis
                <input v-model="podaci.opis"  type="text" placeholder="Opis recepta"  class="form-control">
              </div>

              <div class="form-group">Vrijeme pripreme
                <input v-model="podaci.vrijemePripreme" type="text" placeholder="Vrijeme pripreme"  class="form-control">
              </div>

              <div class="form-group"> Sastojci
                <textarea v-model="podaci.sastojci" type="text" placeholder="Sastojci za pripremu"  class="form-control"/>
              </div>

              <div class="form-group"> Način pripreme
                <textarea v-model="podaci.priprema" type="text" placeholder="Način pripreme"  class="form-control priprema" />
              </div>

              <div v-if="$route.params.edit == 'recepti'">
                <a @click.prevent="Update()" class="btn btn-info my-2 my-sm-0 mr-2">Update</a>
              </div>
            </div>
            
            <div class="col-md-4"></div>
          </div>
          <br><br><br><br>
          <div v-if="$store.user && $route.params.edit != 'recepti'" class="row">
            <div class="col-md-2"></div>

            <div class="col-md-8">
              <p class="error">{{komentarError}}</p>
              <div class="form-group">
                <textarea v-model="komentar.sadrzaj" class="form-group komentar" placeholder="Dodaj komentar" cols="30"></textarea>
              </div>
              <div>
                <button @click.prevent="PostKomentar()" class="btn btn-info my-2 my-sm-0 mr-2">Dodaj komentar</button>
              </div>
            </div>

            <div class="col-md-2"></div>
          </div>
          <br><br>


          <div class="row">
            <div class="col-md-2"></div>
            
            <div class="col-md-8">
              <h3>Komentari</h3>
              <div class="v-for-komentari" v-for="komentar in komentari" :key="komentar._id">
                <p class="alert alert-secondary jedanKom" >
                  {{komentar.sadrzaj}}
                </p>
                <p class="date">{{new Date(komentar.createdAt).getDate()}}.{{new Date(komentar.createdAt).getMonth()}}.
                  {{new Date(komentar.createdAt).getFullYear()}} {{new Date(komentar.createdAt).getHours()}}:{{new Date(komentar.createdAt).getMinutes()}}</p>
                <p v-if="komentar.korisnik == $store.user" @click.prevent="ObrisiKomentar(komentar._id)" class="obrisi">Obrisi</p>
                <i class="pseudo"></i>
              </div> 
                                         
            </div>
            <div class="col-md-2"></div>
          </div>
          

          
          

      </div>
 

      
           
     </div>
  
  
</template>

<script>
import Recept from '../services/recept'
import ReceptKomentar from '../services/receptKomentar'
export default {
  name: 'receptPodaci',
  data(){
    return{
      podaci: {},
      receptError: '',
      komentarError: '',
      pic: false,
      url: '',
      komentar:{
        sadrzaj: '',
        recept: ''
      },
      komentari: [],
      slike: []
    }
  },
  async created() {
    console.log(this.$route.params.edit);
    await this.getRecept()
    await this.getKomentari()
  },
  methods: {
    async Update(){
      this.podaci.sastojci = this.podaci.sastojci.split(',').map((sastojak) =>{
        return {sastojak}
      })
      const noviPodaci = {
        "naziv": this.podaci.naziv,
        "opis": this.podaci.opis,
        "vrijemePripreme": this.podaci.vrijemePripreme,
        "sastojci": this.podaci.sastojci,
        "priprema": this.podaci.priprema
      }
      try {
        let res = await Recept.UpdateRecept(this.$route.params.id, noviPodaci)
        console.log(res);
        this.$router.push({name: 'recepti'})
      } catch (error) {
        this.receptEerror = error.data
      }
    },
    async PostKomentar(){
      this.komentarError = ''
      this.komentar.recept = this.$route.params.id
      try {
        let res = await ReceptKomentar.ObjaviKomentar(this.komentar)
        this.komentar.sadrzaj = ''
        await this.getKomentari()
      } catch (error) {
        this.komentarError = error.data.error
      }
    },
    async getRecept(){
      try {
        let res = await Recept.JedanRecept(this.$route.params.id)
        this.podaci = res.data
        let podacioSlici = await Recept.ReceptSlika(this.$route.params.id)
        console.log(podacioSlici);
        this.url= `${podacioSlici.config.baseURL}${podacioSlici.config.url}`

        
        // if(slika.data.size !== 0) this.pic = true
        // this.url = `${slika.config.baseURL}/recept/${this.$route.params.id}/slika`


        this.podaci.sastojci = res.data.sastojci.map((sastojak) =>{
          return sastojak.sastojak
        }).join(',')
      } catch (error) {
        this.receptEerror = error.data
      }
    },
    async getKomentari(){
      try {
        let komentari = await Recept.ReceptKomentari(this.$route.params.id)
        this.komentari = komentari.data
      } catch (error) {
        this.komentarError = error.data
      }
    },
    async ObrisiKomentar(id){
      try {
        let res = await ReceptKomentar.ObrisiKomentar(id)
        console.log(res);
        await this.getKomentari()
      } catch (error) {
        this.komentarError = error.data
      }
       
    }
  },
}
</script>

<style>
.error{
  color: red;
}

img{
  max-width:100%;
  max-height:100%;
}

.komentar{
  margin: 0px;
  width: 100%;
}

.jedanKom{
  font-size: 28px;
  justify-self: start;
  background-color: white;
  border: 0px !important;
  word-wrap: break-word;
}

.obrisi{
  font-size: 14px;
  font-weight: 500;
  background-color: white;
  border: 0px !important;
  justify-self: start;
  align-self: center;
  cursor: pointer;
  padding: 0 10px 0 5px;
  font-style: oblique;
  border-radius: 0 0 .25rem 0;
  z-index: 100;
}

.v-for-komentari{
  display: grid;
  grid-template-columns: 10fr;
  margin: 10px 0;
}

p{
  margin-block-start: 0 !important;
  margin-block-end: 0 !important;
  margin: 0 !important;
}

.alert{
  border-radius: .25rem .25rem .25rem 0;
}

.pseudo{
  background-color: transparent;
  width: 10px;
  height: 15px;
  border-radius: 12px 0 0 0;
  box-shadow: 0 -9px 0 0 white;
  z-index: 10;
}

.date{
  font-size: 16px;
  font-weight: 500;
  background-color: white;
  border: 0px !important;
  justify-self: start;
  padding: 0 10px 0 5px;
  border-radius: 0 0 .25rem 0;
  z-index: 100;
}
</style>