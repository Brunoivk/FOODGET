<template>
    <div>
        <div>
        <H1>REGISTRIRAJ SE</H1></div>
        <p class="error">{{error}}</p>
        <div class="container">
  <div class="row">
    
    <div class="col-sm">
     <form @submit.prevent="registracija">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="body.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input v-model="body.password" type="password" class="form-control"  placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Again Password</label>
    <input v-model="passwordAgain" type="password" class="form-control" placeholder="againPassword" autocomplete="new-password">
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
    name: 'registriranje',
    data(){
      return{
        body: {
          email: "",      
          password: ""
        },      
        passwordAgain: "",
        error: '',
      }
    },
    methods: {    
     async registracija() { 
        this.error = ''
        if(this.body.password != this.passwordAgain) return this.error = "Lozinke nisu iste" 

        try {
          let res = await User.Register(this.body)
          console.log(res);
          localStorage.setItem('token', res.data.token)
          this.$store.token = res.data.token
          this.$store.user = res.data.user._id
          console.log(this.$store);
        } catch (error) {
          console.log(error);
          this.error = error.data.error
        }
      } 
    }
}
</script>


<style scoped>
.error{
  color: red;
}

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