const express = require('express')
const User = require('../db/models/user.js')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');

const UserRouter = new express.Router()


UserRouter.post('/api/users', async (req, res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        console.log(token);
        res.status(201).send({user, token})
    } catch (error) {
        console.log(error);
        res.status(406).send({ error: error.message})
    }
})

UserRouter.post('/api/users/login', async (req, res) =>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(406).send({ error: error.message})
    }
})


UserRouter.get('/api/users/me', auth, async (req, res) =>{
    res.send(req.user)
})

UserRouter.patch('/api/users/me', auth, async (req, res) =>{
    console.log("patch");
    const updates = Object.keys(req.body)
    const allowedUpdates= ["password"];
    const isValidOperation = updates.every((update) =>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send("Invalid")
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(400).send({ error: error.message})
    }
})

UserRouter.delete('/api/users/me', auth, async (req, res) =>{

    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send({ error: error.message})
    }
})



module.exports = UserRouter