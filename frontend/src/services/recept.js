import Service from './axiosInit'

let Recept = {
    async Objavi(podaci){
        try {
            console.log(podaci);
            return await Service.post('/recept', podaci)
        } catch (error) {
            throw error.response;
        }
    },
    async ObjaviSliku(id, form){
        console.log("dasdasd");
        try {
            console.log(id, form);
            return await Service.post(`/recept/${id}/slika`, form)
        } catch (error) {
            throw error.response;
        }
    },
    async SviRecepti(pretraga, skip, random){
        console.log(pretraga);
        try {
            return await Service.get(`/recept?pretraga=${pretraga}&skip=${skip}&random=${random}`)
        } catch (error) {
            throw error.response;
        }
    },
    async JedanRecept(id){
        try {
            return await Service.get(`/recept/${id}`)
        } catch (error) {
            throw error.response;
        }
    },
    async UpdateRecept(id, body){
        try {
            return await Service.patch(`/recept/${id}`, body)
        } catch (error) {
            throw error.response;
        }
    },
    async ReceptKomentari(id){
        try {
            return await Service.get(`/recept/${id}/komentari`)
        } catch (error) {
            throw error.response;
        }
    },
    async ReceptSlika(id){
        try {
            return await Service.get(`/recept/${id}/slika`, {
                responseType: 'blob'
            })
        } catch (error) {
            throw error.response;
        }
    },
    async Obrisi(id){
        try {
            return await Service.delete(`/recept/${id}`)
        } catch (error) {
            throw error.response;
        }
    },
    async UserRecepti(skip){
        try {
            return await Service.get(`/me/recepti?skip=${skip}`)
        } catch (error) {
            throw error.response
        }
    }
}

export default Recept