<template>
<div>
<div >

<div class="container">
    <p class="error">{{objavaError}}</p>
    <div class="row">
        <div class="col-sm">
            <div class="w-80 p-3 objava" style="background-color: #eee;">
                <p class="dodao">Dodano od strane : {{objava.email}}</p> <br>
                <div class="border w-90 p-3 sadrzaj">
                    <h6>{{objava.sadrzaj}}</h6>
                </div>
            </div>
        </div>
    </div>
    <br><br>
    <div v-if="$store.user && $route.params.edit != 'recepti'" class="row">
        <div class="col-md-2"></div>

        <div class="col-md-8">
            <p class="error">{{komentarError}}</p>
            <div class="form-group">
                <textarea v-model="noviKomentar.sadrzaj" class="form-group komentar" placeholder="Dodaj komentar" cols="30"></textarea>
            </div>
            <div>
                <button @click.prevent="DodajKomentar()" class="btn btn-info my-2 my-sm-0 mr-2">Dodaj komentar</button>
            </div>
        </div>

        <div class="col-md-2"></div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-md-2"></div>

        <div class="col-md-8">
            <h3>Komentari</h3>
            <div>
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
        </div>

        <div class="col-md-2"></div>
    </div>
</div>

</div>

</div>
</template>

<script>
import forumkomentari from '@/components/forumkomentari.vue'
import Forum from '../services/forumObjava'
import forumKomentar from '../services/forumKomentar'
export default {
    name: 'objava',
    components: {
        forumkomentari
    },
    data(){
        return{
            objava: {},
            komentarError: '',
            objavaError: '',
            noviKomentar:{
                sadrzaj: ''
            },
            komentari: []            
        }
    },
    async created() {
        await this.DohvatiObjavu()
        await this.DohvatiKomentare()
    },
    methods: {
        async DohvatiObjavu(){
            try {
                let res = await Forum.JednaObjava(this.$route.params.id)
                console.log(res);
                this.objava = res.data
            } catch (error) {
                this.objavaError = error.data
            }
        },
        async DodajKomentar(){
            this.komentarError = ''
            this.noviKomentar.objava = this.$route.params.id 
            try {
                let res = await forumKomentar.DodajKomentar(this.noviKomentar)
                this.noviKomentar.sadrzaj = ''
                await this.DohvatiKomentare()
                console.log(res);
            } catch (error) {
                this.komentarError = error.data.error
            }  
        },
        async DohvatiKomentare(){
            this.komentarError = ''
            try {
                let res = await Forum.Komentari(this.$route.params.id)
                console.log(res);
                this.komentari = res.data
            } catch (error) {
                this.komentari = []
                this.komentarError = error.data.error
            }  
        },
        async ObrisiKomentar(id){
            try {
                let res = await forumKomentar.Obrisi(id)
                console.log(res);
                await this.DohvatiKomentare()
            } catch (error) {
                this.komentarError = error.data.error
            }  
        },
    },
}
</script>

<style lang="css" scoped>
.error{
    color: red;
    margin-bottom: 10px !important;
}

.dodao{
    font-size: 14px;
}

.sadrzaj{
    color: white;
    background-color: rgb(0, 0, 0, 0.5);
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


.objava{
    margin-top: 10px;
}
</style>