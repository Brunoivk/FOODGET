<template>
    <div>
        <div>
        <H1>Profil</H1></div>
        <p class="error">{{error}}</p>
        <div class="container">
  <div class="row">
    
    <div class="col-sm">
     <form @submit.prevent="updateProfile">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="body.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" disabled>
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">New password</label>
    <input v-model="body.password" type="password" class="form-control"  placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Again Password</label>
    <input v-model="passwordAgain" type="password" class="form-control" placeholder="Again password" autocomplete="new-password">
  </div>
  
  <button type="submit" class="btn btn-primary">Update</button>
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
        body: {},      
        passwordAgain: "",
        error: '',
      }
    },
    async created() {
      await this.getUserData()
    },
    methods: {    
     async updateProfile() { 
        this.error = ''
        if(this.body.password != this.passwordAgain) return this.error = "Lozinke nisu iste" 

        try {
          let body = {
            password:  this.body.password
          }
          let res = await User.Update(body)
          console.log(res);
        } catch (error) {
          console.log(error);
          this.error = error.data.error
        }
      },
      async getUserData(){
        try {
          let res = await User.Profile()
          this.body = res.data
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
</style>