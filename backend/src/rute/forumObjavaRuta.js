const express = require('express');
const ForumObjava = require('../db/models/forumObjava.js');
const ForumKomentar = require('../db/models/forumKomentar.js');
const auth = require('../middleware/auth')



//posto su rute podjeljene u vise fileova, u svakome treba instancirati novu
var ForumObjavaRuta = new express.Router()

//ruta koja sprema u bazu
ForumObjavaRuta.post('/api/forum/objava', auth, async (req, res) =>{
    
    var objava = new ForumObjava({
        ...req.body,
        korisnik: req.user._id,
        email: req.user.email
    })
    try {
        
        await objava.save()
        res.status(200).send(objava)
    } catch (error) {
        console.log(error);
        
        res.status(500).send({error: error.message})
    }
})

//dohvaca sve recepte
//match sluzi za pretragu 
ForumObjavaRuta.get('/api/forum', async (req, res) =>{
    const match = {}
    
    console.log("sadrzaj",req.query.sadrzaj);
    if(req.query.sadrzaj != null && req.query.sadrzaj != 'undefined' && req.query.sadrzaj){
        let termin = new RegExp(`^.*${req.query.sadrzaj}.*$`, "img")
        match['sadrzaj'] = termin
    }
    
    try {
        console.log(match);
        //pokusava dohvatit sve po tome
        var objave = await ForumObjava.find(match, null).limit(10).skip(parseInt(req.query.stranica) * 10);
        console.log(objave);
        if(objave.length === 0) return res.status(404).send("Nema objava")
        res.send({objave})
    } catch (error) {
        res.status(500).send(error)
    }
})

ForumObjavaRuta.get('/api/me/objave', auth, async (req, res) =>{
    try {
        let objave = await ForumObjava.find({korisnik: req.user._id})
        if(!objave) return res.status(404).send("Nemate objava")

        res.status(200).send(objave)
    } catch (error) {
        res.status(500).send(errpr)
    }
})

//dohvati jedan recept
ForumObjavaRuta.get('/api/forum/objava/:id', async (req, res) =>{
    const _id = req.params.id;
    try {
        const objava = await ForumObjava.findOne({_id});
        if(!objava){
            return res.status(404).send({error: "Objava ne postoji"})
        }
        res.send(objava)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//dohvaca sve komentare za taj recept
ForumObjavaRuta.get('/api/forum/objava/:id/komentari', async (req, res) =>{
    const _id = req.params.id;
    try {
        const komentari = await ForumKomentar.find({objava: _id});
        if(komentari.length === 0){
            return res.status(404).send({error: "Komentari ne postoje"})
        }
        res.send(komentari)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//update jednog recepta
ForumObjavaRuta.patch('/api/forum/objava/:id', auth, async (req, res) =>{
    
    const updates = Object.keys(req.body)

    const dozvoljenePromjene = ["sadrzaj"];
    const smijeLiSePromjeniti = updates.every((promjena) =>{
        return dozvoljenePromjene.includes(promjena)
    })
    if(!smijeLiSePromjeniti){
        return res.status(400).send()
    }
    try {
        
        const objava = await ForumObjava.findOne({_id:req.params.id, korisnik: req.user._id})
        updates.forEach((promjena) => objava[promjena] = req.body[promjena])
        
        await objava.save()
        if(!objava){
            return res.status(404).send()
        }
        res.send(objava)
    } catch (error) {
        res.status(400).send(error)
    }
})

//nade recept po id-ju i obrise ga
ForumObjavaRuta.delete('/api/forum/objava/:id', auth, async (req, res) =>{
    const _id = req.params.id;
    try {
        const objava = await ForumObjava.findOne({_id, korisnik: req.user._id})
        if(!objava){
            return res.status(404).send()
        }
        await objava.remove()
        res.send(objava)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = ForumObjavaRuta
