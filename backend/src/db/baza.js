const mongoose = require('mongoose');


//najjednostavnije stvaranje baze, "mongodb://127.0.0.1:27017/food" zamjeni sa linkom svoje baze koju napravis na mongo atlas
mongoose.connect( 'mongodb+srv://admin:admin@cluster0.1pvmq.mongodb.net/foodget?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})





