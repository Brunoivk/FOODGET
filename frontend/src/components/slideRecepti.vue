<template>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <router-link :to="{ name: 'receptPodaci', params: {id: rndRecepti[0].split(',')[1]} }">     
                <img class="d-block w-100 custom-img" :src="rndRecepti[0].split(',')[0]" >
            </router-link>

            </div>
            <div class="carousel-item" v-for="recept in rndRecepti.slice(1)" :key="recept">
                <router-link :to="{ name: 'receptPodaci', params: {id: recept.split(',')[1]} }">  
                    <img class="d-block w-100" :src="recept.split(',')[0]" >
                </router-link>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
      </div>
</template>


<script>
import Recept from '../services/recept'
export default {
  name: 'slideRecepti',
  data(){
    return{
     rndRecepti: []
    }
  },
  async mounted() {  
      try {
        let res = await Recept.SviRecepti(null, null, true)
        console.log(res);
        res.data.randomRecepti.map(async (recept) =>{
            let res = await Recept.ReceptSlika(recept._id)
            console.log(res);
            this.rndRecepti.push(`${res.config.baseURL}/recept/${recept._id}/slika,${recept._id}`)
        })
        // this.rndRecepti = res.data.randomRecepti
        console.log(this.rndRecepti);
      } catch (error) {
          console.log(error);
        this.error = error.data.error
      }
    // let res = await Recept.ReceptSlika(this.info._id)
    // if(res.data.size !== 0) this.pic = true
    // this.url = `${res.config.baseURL}/recept/${this.info._id}/slika`
  },
}
</script>

<style lang="css" scoped>
img{
    width: 50% !important;
    margin: auto;
    margin-top: 1vh;
    border-radius: 25px;;
    height: 50vh;
}

.carousel-control-prev{
  left: 20%;
}
.carousel-control-next{
  right: 20%;
}

@media only screen and (max-width: 992px) {
img{
  height: 40vh;
  width: 100% !important;
}
.carousel-control-prev{
  left: 0;
}
.carousel-control-next{
  right: 0;
}
}
</style>