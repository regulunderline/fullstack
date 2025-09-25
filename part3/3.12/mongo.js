const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fullstack:${password}@ac-eynijkn-shard-00-00.hyvmgni.mongodb.net:27017,ac-eynijkn-shard-00-01.hyvmgni.mongodb.net:27017,ac-eynijkn-shard-00-02.hyvmgni.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-stfsgo-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length >3){
    const person = new Person({
    name: process.argv[3],
    number: process.argv[4] || ''
    })

    person.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4] || ''} to phonebook`)
    mongoose.connection.close()
    })
}
else{
    Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
    })
}