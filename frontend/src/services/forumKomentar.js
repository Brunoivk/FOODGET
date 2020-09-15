import Service from '../services/axiosInit'


let forumKomentar = {
    async DodajKomentar(body){
        try {
            return await Service.post('/forum_komentar', body)
        } catch (error) {
            throw error.response
        }
    },
    async Obrisi(id){
        try {
            return await Service.delete(`/forum_komentar/${id}`)
        } catch (error) {
            throw error.response
        }
    },
}


export default forumKomentar