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