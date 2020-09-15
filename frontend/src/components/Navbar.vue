<template>
    <div class="hello">
   <nav class="navbar custom-nav  navbar-expand-lg navbar-light"  style="background-color: #6d6c96;">
     <div class="container">
        
        
        
        
        
        
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> 

        
        
        
  <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <router-link class="navbar-brand" to="/">Naslovnica</router-link>
        <router-link v-if="$store.user" class="navbar-brand" to="/dodavanjerecepata">Dodaj recept</router-link>
        <router-link class="navbar-brand" to="/forum">Forum</router-link>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Profil
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">

          <router-link v-if="$store.user" class="drop-item" :to="{ name: 'profil' }">Podaci profila</router-link>
          <router-link v-if="$store.user" class="drop-item" :to="{ name: 'recepti' }">Moji recepti</router-link>
          <router-link v-if="$store.user" class="drop-item" :to="{ name: 'mojeObjave' }">Moje objave</router-link>
          <router-link v-if="!$store.user" class="drop-item" :to="{ name: 'prijavljivanje' }">Prijava </router-link>
          <router-link v-if="!$store.user" class="drop-item" :to="{ name: 'registriranje' }">Registracija</router-link>
          <div v-if="$store.user" @click="logout" class="drop-item">Logout</div>
        </div>
      </li>
          <form class="form-inline my-2 my-lg-0">
            <receptSearchBar v-on:search="test()" v-if="$route.name === 'naslovnica'"/>
            <forumSearchBar v-if="$route.name === 'forum'"/>
          </form>
  </div>
      </div>
    </nav>
  </div>
</template>

<script>
import receptSearchBar from '@/components/receptSearchBar'
import forumSearchBar from '@/components/forumSearchBar'
import store from '@/store.js'
export default {
  components:{
    receptSearchBar,
    forumSearchBar
  },
    data(){
    return store;
    },
  name: "Navbar",
  props: {
    msg: String
  },
  
  methods:{
      logout() {
        this.$store.user = ''
        this.$store.toekn = ''
        localStorage.clear()
        this.$router.push({name: 'prijavljivanje'})
    },
    test(){
      this.$emit("search")
    }
  },
  mounted () {
  
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 992px) { 
    
    .navbar.custom-nav{
      padding-top:16px;
      padding-bottom:16px;
      background: rgba(172, 0, 0, 0.774) !important;
    }
    .navbar-brand{
      color:azure;
    }
  
}
@media only screen and (max-width: 992px) {
  .navbar{
    height:auto !important;
  }
}

.btn3:hover{
  transform: rotate(360deg);
      transition-duration: 1s;
}

li{
  text-decoration: none;
  list-style-type: none;
  
}

.nav-link{
  color: white;
  font-size: 1.2rem;
}

.drop-item{
  display: block;
  text-decoration: none;
  color: black;
  padding-left: 5px;
  cursor: pointer;
}

.drop-item:hover{
  background-color: rgba(172, 0, 0, 0.774);
  color: white;
  // transform: scale(1.05, 0);
}

.navbar{
  height: 10vh;
}

</style>