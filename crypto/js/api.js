//Api url of global information
const urlApi_global = "https://api.coinlore.net/api/global/";

//Api url of top10 information
const urlApi_topTen = "https://api.coinlore.net/api/tickers/?start=0&limit=10";

function showGoblobalResume() {
  //fetch API for global info
  fetch(urlApi_global)
  .then((response) => response.json())
  .then((jsObject) =>{
    cryptos.innerHTML = jsObject[0].coins_count;
    activeMarkets.innerHTML = jsObject[0].active_markets;
    marketCap.innerHTML = jsObject[0].total_mcap;
    marketCapChange.innerHTML = jsObject[0].mcap_change;
    btcDominance.innerHTML = jsObject[0].btc_d;
    ethDominance.innerHTML = jsObject[0].eth_d;
    avgPriceChange.innerHTML = jsObject[0].avg_change_percent;
  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function showTop10Coins(){
//fetch API for top10 info
fetch(urlApi_topTen)
  .then((response) => response.json())
  .then((jsObject) =>{
    
    for(let i = 0; i < jsObject.data.length ;i++){
      //creating elements
      let card = document.createElement('div');
      let rankCoin = document.createElement('span');
      let imageCoin = document.createElement('img');
      let nameCoin = document.createElement('a');
      let priceCoin = document.createElement('p');
      let change_1h = document.createElement('p');
      let change_24h = document.createElement('p');
      let marketCapCoin = document.createElement('p');
      let readMoreLink = document.createElement('a');

      //assigning values
      rankCoin.textContent = jsObject.data[i].rank;
      imageCoin.setAttribute('src', 'https://www.coinlore.com/img/'+ jsObject.data[i].nameid + '.png');
      imageCoin.setAttribute('alt', 'logo of '+ jsObject.data[i].nameid);
      nameCoin.innerHTML = `<a href="#" class="nameCoin">${jsObject.data[i].name}</a>`;
      priceCoin.innerHTML = `<p>Actual Price: <span class="coinInfo">$${jsObject.data[i].price_usd}</span></p>`;
      change_1h.innerHTML = `<p>1h: <span class="coinInfo">${jsObject.data[i].percent_change_1h}%</span></p>`;
      change_24h.innerHTML = `<p>24h: <span class="coinInfo">${jsObject.data[i].percent_change_24h}%</span></p>`;
      marketCapCoin.innerHTML = `<p>Market Cap: <span class="coinInfo">$${jsObject.data[i].market_cap_usd}</span></p>`;
      readMoreLink.innerHTML = `<a href="#">Read more</a>`;

      //adding elements to card
      card.appendChild(rankCoin);
      card.appendChild(imageCoin);
      card.appendChild(nameCoin);
      card.appendChild(priceCoin);
      card.appendChild(change_1h);
      card.appendChild(change_24h);
      card.appendChild(marketCapCoin);
      card.appendChild(readMoreLink);

      //set class to cards
      card.setAttribute("class","card");

      //adding cards to topCoins
      document.getElementById('topCoins').appendChild(card);

      //console.log(jsObject.data[i]);
    }

  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}


//function for testing
function sayHi(){
  console.log("hi");
}

//export
export{sayHi,showGoblobalResume,showTop10Coins};