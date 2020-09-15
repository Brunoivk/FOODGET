import Service from './axiosInit'
import { update } from '../../../backend/src/db/models/user'


let User = {
    async Register(body){
        try {
            return await Service.post('/users', body)
        } catch (error) {
            throw error.response
        }
    },
    async Login(body){
        try {
            return await Service.post('/users/login', body)
        } catch (error) {
            throw error.response
        }
    },
    async Profile(){
        try {
            return await Service.get('/users/me')
        } catch (error) {
            throw error.response
        }
    },
    async Update(body){
        console.log("update");
        try {
            return await Service.patch('/users/me', body)
        } catch (error) {
            throw error.response
        }
    }
}



export default User