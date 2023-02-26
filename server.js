const express = require('express')// This gets the modules from express, don't forget the quotation marks
const app = express()//This gives us all of the functions that came from express and puts them in a variable
const cors = require('cors')//Removes the cors problems
const PORT = 8000//The number itself is not the important part, like I think it  could be just about any number

app.use(cors())

let duelists = {
  'yugi muto': {//should be lowercase for below in order to make sure that case doesn't matter for checking
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
}

app.get('/', (request, response) => {
 response.sendFile(__dirname + '/index.html')//dirname pretty much says, hey wherever the server file is, look for the html file in that directory
})

app.get('/api/duelists/:duelistName', (request, response) => {
  const duelName = request.params.duelistName.toLowerCase()
  if(duelists[duelName]){
    response.json(duelists[duelName])
  } else {
    response.json(duelists['unknown'])
  }

})

app.listen(process.env.PORT || PORT, () => {
 console.log(`Server Running on port ${PORT}`)
})