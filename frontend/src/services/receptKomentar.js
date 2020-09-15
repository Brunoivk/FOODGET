import Service from '../services/axiosInit'


let ReceptKomentar = {
    async ObjaviKomentar(body){
        try {
            return await Service.post('/recept_komentar', body)
        } catch (error) {
            throw error.response;  
        }
    },
    async ObrisiKomentar(id){
        try {
            return await Service.delete(`/recept_komentar/${id}`)
        } catch (error) {
            throw error.response;
        }
    }
}


export default ReceptKomentar