// const express = require('express')// This gets the modules from express, don't forget the quotation marks
// const app = express()//This gives us all of the functions that came from express and puts them in a variable
// const cors = require('cors')//Removes the cors problems
// const PORT = 8000//The number itself is not the important part, like I think it  could be just about any number
// // const MongoClient = require('mongodb').MongoClient

// // MongoClient.connect('mongodb+srv://ameersf0:RorhqcQDMZs2VkvC@cluster0.sf9xgsh.mongodb.net/?retryWrites=true&w=majority', (err, client) => {
// //   if (err) return console.error(err)
// //   console.log('Connected to Database')
// // })

// // MongoClient.connect('mongodb+srv://ameersf0:RorhqcQDMZs2VkvC@cluster0.sf9xgsh.mongodb.net/?retryWrites=true&w=majority', {
// //   useUnifiedTopology: true
// // }, (err, client) => {
// //   if (err) return console.error(err)
// //   console.log('Connected to Database')
// // })

// MongoClient.connect('mongodb+srv://ameersf0:RorhqcQDMZs2VkvC@cluster0.sf9xgsh.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//   })
//   .catch(error => console.error(error))

// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = "mongodb+srv://ameersf0:RorhqcQDMZs2VkvC@cluster0.sf9xgsh.mongodb.net/?retryWrites=true&w=majority";
// // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// // client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   // perform actions on the collection object
// //   client.close();
// // });

// let db,//global variable
//     dbConnetionStr = 'mongodb+srv://ameersf0:RorhqcQDMZs2VkvC@cluster0.sf9xgsh.mongodb.net/yugioh?retryWrites=true&w=majority',
//     dbName = 'yugioh'

// MongoClient.connect(dbConnetionStr, { useUnifiedTopology: true })
//   .then(client => {
//     console.log(`Connected to ${dbName} database`)
//     db = client.db(dbName)
//   })

// app.set('view engine', 'ejs')
// app.use(express.static('public'))// serve up any files that I put in the public folder
// app.use(express.urlencoded({ extended: true}))//This and the following use enables us to see the data that is passed back and forth from the request, its pretty much body parser, like literally
// app.use(express.json())//Look at the previous comment





// app.use(cors())//This needs to be before the other methods like get and listen

// let duelists = {
//   'yugi muto': {//should be lowercase for below in order to make sure that case doesn't matter for checking
//     'mmt': 'SpellCasters',
//     'series': 'Yu-Gi-Oh! Duel Monsters',
//     'aceMonster': 'Black Magician'
//   },
//   'judai yuki': {
//     'mmt': 'Warriors',
//     'series': 'Yu-Gi-Oh GX',
//     'aceMonster': 'Elemental Hero Neos'
//   },
//   'seto kaiba': {
//     'mmt': 'Dragons',
//     'series': 'Yu-Gi-Oh! Duel Monsters',
//     'aceMonster': 'Blue-Eyes White Dragon'
//   },
//   'unknown': {
//     'mmt': 'unknown',
//     'series': 'unknown',
//     'aceMonster': 'unknown'
//   }
// }

// app.get('/', (request, response) => {
//  response.sendFile(__dirname + '/index.html')//dirname pretty much says, hey wherever the server file is, look for the html file in that directory
// })

// app.get('/api/duelists/:duelistName', (request, response) => {
//   const duelName = request.params.duelistName.toLowerCase()
//   if(duelists[duelName]){
//     response.json(duelists[duelName])
//   } else {
//     response.json(duelists['unknown'])
//   }

// })

// app.get('/', (request, response) => {
//   db.collection('duelists').find().toArray()
//   .then(data => {
//     response.render('index.ejs', { duelistinfo: data })
//   })
//   .catch(error => console.error(error))
// })

// app.post('/addDuelist', (request, response) => {
//   db.collection('duelists').insertOne(request.body)
//   .then(result => {
//     console.log('Duelist Added')
//     response.redirect('/')
//   })
//   .catch(error => console.error(error))
// })

// app.delete('/deleteDuelist', (request, response) => {
//   db.collection('duelists').deleteOne({stageName: request.body.mmtS})
//   .then(result => {
//     console.log('Duelist Deleted')
//     response.json('Duelist Deleted')
//   })
//   .catch(error => console.error(error))
// })

// app.listen(process.env.PORT || PORT, () => {//DO NOT FORGET TO ADD THE process.env.PORT DO NOT.  Its for Heroku!!!!!!
//  console.log(`Server Running on port ${PORT}`)
// })


const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;
const MongoClient = require('mongodb').MongoClient;

const dbConnectionStr = 'mongodb+srv://ameersf0:RorhqcQDMZs2VkvC@cluster0.sf9xgsh.mongodb.net/?retryWrites=true&w=majority',
dbName = 'yugioh'

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

let db,
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db(dbName);

    app.get('/', (request, response) => {
      db.collection('duelists').find().toArray()
        .then(data => {
          response.render('index.ejs', { duelistinfo: data })
        })
        .catch(error => console.error(error))
    });

    app.post('/addDuelist', (request, response) => {
      db.collection('duelists').insertOne(request.body)
        .then(result => {
          console.log('Duelist Added');
          response.redirect('/');
        })
        .catch(error => console.error(error))
    });

    app.delete('/deleteDuelist', (request, response) => {
      db.collection('duelists').deleteOne({stageName: request.body.mmtS})
        .then(result => {
          console.log('Duelist Deleted');
          response.json('Duelist Deleted');
        })
        .catch(error => console.error(error))
    });
  })
  .catch(error => console.error(error))

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.get('/api/duelists/:duelistName', (request, response) => {
  const duelName = request.params.duelistName.toLowerCase()
  const duel = duelists[duelName] ? duelists[duelName] : duelists['unknown'];
  response.json(duel);
});

let duelists = {
  'yugi muto': {
    'mmt': 'SpellCasters',
    'series': 'Yu-Gi-Oh! Duel Monsters',
    'aceMonster': 'Black Magician'
  },
  'judai yuki': {
    'mmt': 'Warriors',
    'series': 'Yu-Gi-Oh GX',
    'aceMonster': 'Elemental Hero Neos'
  },
  'seto kaiba': {
    'mmt': 'Dragons',
    'series': 'Yu-Gi-Oh! Duel Monsters',
    'aceMonster': 'Blue-Eyes White Dragon'
  },
  'unknown': {
    'mmt': 'unknown',
    'series': 'unknown',
    'aceMonster': 'unknown'
  }
};

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});