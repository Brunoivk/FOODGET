<template>
  <div id="app">
    
    <navbar />
  <!-- <HelloWorld/> -->
  
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import HelloWorld from '@/components/HelloWorld.vue'
import store from '@/store.js'



export default {
  data(){
    return store;  // uspjesno cita iz stora
  },
  name: 'App',
  
  components: {
    Navbar,HelloWorld
  },
  mounted(){ // citamo ucitanje postove s firestorea
    

  }
}
</script>

<style lang="scss">
:root {
  --text: #2d4059;
  --bg: #ffd460;
  --app-bg: #e2ded3;
}


#app {
  background-image: linear-gradient( #e2ded3,#e2ded3);
  height: 100vh;
  overflow: auto;
  font-family: 'Julius Sans One', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
