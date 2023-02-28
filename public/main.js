const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element) => {
  element.addEventListener('click', deleteDuelist)
})

async function deleteDuelist(){
  const mType = this.parentNode.childNodes[1].innerText
  const cSeries = this.parentNode.childNodes[3].innerText
  const aMonster = this.parentNode.childNodes[5].innerText
  try {
    const response = await fetch('deleteDuelist', {//Fetch is the only way to make these requests from client side javascript
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'mmtS': mType,
        'seriesS': cSeries,
        'aceMonsterS': aMonster
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()

  } catch(err){

  }
}

// const { MongoClient } = require("mongodb");
// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://ameersf0:RorhqcQDMZs2VkvC@cluster0.sf9xgsh.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);