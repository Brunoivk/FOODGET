<template>
    <div class="prijava">
        <div>
        <H1>PRIJAVI SE</H1></div>
        <div class="container">
  <div class="row">
    
    <div class="col-sm">
     <form  @submit.prevent="login">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="body.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input  v-model="body.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
    
  </div>
</div>
        
    </div>
</template>


<script>
import User from '@/services/user'
export default {
    name: 'prijavljivanje',
    data(){
      return{
        body: {
          email: '',
        password:''
        }
      }
    },
    methods: {
    async login () { 
      try {
          let res = await User.Login(this.body)
          console.log(res);
          localStorage.setItem('token', res.data.token)
          this.$store.token = res.data.token
          this.$store.user = res.data.user._id
          console.log(this.$store);
          this.$router.push({name : "naslovnica"})
        } catch (error) {
          console.log(error);
          this.error = error.data.error
        }
      
    }
}
}
</script>

<style lang="css" scoped>

.row{
  width: 60%;
  margin: auto;
}

@media only screen and (max-width: 992px) {
  .row{
    width: 100%;
  }
}
</style>
