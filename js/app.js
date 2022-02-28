document.getElementById('search-btn').addEventListener('click', function (){
  document.getElementById('spinner').style.display = 'block'
    const searchField = document.getElementById('inputField');
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchField.value}`
    searchField.value = ''

    fetch(url)
    .then(res=> res.json())
    .then(data => {
      if(data.player == null){
        alert('No result Found')
        document.getElementById('spinner').style.display = 'none'
      }
      else{
        displayData(data.player)
      }
    })
})

const displayData = players =>{
  if(players){
    document.getElementById('spinner').style.display = 'none'
  }
  else{
    document.getElementById('spinner').style.display = 'block'
  }
    const parent = document.getElementById('allCards');
    parent.textContent = ''
    for(const player of players){
      // console.log(player.idPlayer);
        const div = document.createElement('div');
        div.classList.add('col-lg-6')
        div.classList.add('col-md-6')
        div.innerHTML = `
        <div class="card custom-shadow" >
                <img src="${player.strThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Name: ${player.strPlayer}</h5>
                  <p class="card-text">Country: ${player.strNationality}</p>
                  <a href="#" class="btn btn-primary" onclick="searchById(${player.idPlayer})">Details</a>
                </div>
              </div>
        
        `
        parent.appendChild(div);
        
    }
}


// Right Side Javascript code
const searchById = playerId =>{
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayPlayerData(data.players[0]))
}

const displayPlayerData = player =>{
  const container = document.getElementById('leftContainer');
  container.textContent = ''
  const div = document.createElement('div');
  div.classList.add('card')
  div.classList.add('mb-3');
  const description = `${player.strDescriptionEN}`.slice(0, 200)
  div.innerHTML = `
            <div class="row g-0">
              <div class="col-md-4 d-flex align-content-center">
                <img src="${player.strThumb}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${player.strPlayer}</h5>
                  <p>Nationality: ${player.strNationality}</P>
                  <small>Birth: ${player.dateBorn}</small> <br>
                  <small>${player.strBirthLocation}</small> <br>
                  <small>Position: ${player.strPosition}</small>
                  <p class="card-text">${description}</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
  `
  container.appendChild(div)
}