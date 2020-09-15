
<template>
  <div class="recepti">

<h1>DODAVANJE RECEPATA</h1>
    <h2>Dodaj novi recept</h2>
    
<h4 class="error">{{error}}</h4>  
<div>
<div class="modal-header">
              
            </div>

    
</div>
      <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-4">
                    
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <input v-model="body.naziv" type="text" placeholder="Naziv recepta"  class="form-control">
                    </div>

                    <div class="form-group ">
                      <input v-model="body.opis" type="text" placeholder="Opis recepta"  class="form-control">
                    </div>

                    <div class="form-group">
                      <input v-model="body.vrijemePripreme" type="text" placeholder="Vrijeme pripreme"  class="form-control">
                    </div>

                    <div class="form-group">
                      <textarea v-model="sastojci" type="text" placeholder="Sastojci za pripremu"  class="form-control" />
                    </div>

                    <div class="form-group">
                      <textarea v-model="body.priprema" type="text" placeholder="Način pripreme"  class="form-control priprema" />
                    </div>
            <!-- ZASAD SAMO URL  -->
                    <form @submit.prevent="postNewImage" class="form-inline mb-5">   
            <div class="form-group">    
                <label for="imageUrl">Select image </label>     
                 <input type="file" id="file" ref="file" v-on:change="OcitajSliku()"/>
           </div>    
            </form> 
                    <div>
                      <a @click="DodajRecept()" class="btn btn-info my-2 my-sm-0 mr-2">Dodaj</a>
                    </div>
                  </div>
                  
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    

                    
                    

                  </div>
                </div>

                

            </div>
 

      
           
     </div>
  
  
</template>
<script>


import karticerecepata from '@/components/karticerecepata.vue'
import store from '@/store.js'
import Recept from '../services/recept'
export default {
  name:"recepti",
  components: {
    karticerecepata
  },
  data(){
    return{
      body:{
        naziv: '',
        priprema: '',
        vrijemePripreme: '',
        sastojci: [],
        opis: ''
      },
      sastojci: '',
      error: '',
      slika: {}
    }
  },
  methods: {
    async DodajRecept(){
      this.error = ''
      try {
        let form = new FormData()
        form.append('slika', this.slika)
        form.append('naziv', this.body.naziv)
        form.append('priprema', this.body.priprema)
        form.append('vrijemePripreme', this.body.vrijemePripreme)
        form.append('opis', this.body.opis)
        form.append('sastojci', this.sastojci)
        

        let res = await Recept.Objavi(form)
        this.$router.push({name : 'naslovnica'})
      } catch (error) {
        this.error = error.data.error
        console.log(error);
      }
    },
    OcitajSliku(){
      console.log(this.$refs.file.files[0]);
      this.slika = this.$refs.file.files[0];
    }
  },
 
}
</script>

<style scoped>
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.priprema{
  height: 200px;
}

.error{
  color: red;
}
</style>

