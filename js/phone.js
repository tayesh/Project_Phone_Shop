// declairing error variable to show error for invalid inputs****
const errorMessage = document.getElementById('error-message').style.display = "none";
// taking search input*****
const searchPhone = () => {
  const searchfield = document.getElementById('search-field')
  const searchText = searchfield.value;
  searchfield.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  fetch(url)
    .then(res => res.json())
    .then(result => dispaySearchResult(result.data))
}
// showing search result*******
const dispaySearchResult = data => {
  // cheking valid input for showing result*****
  if (data.length === 0) {
    const errorMessage = document.getElementById('error-message').style.display = "block";
    const searchresult = document.getElementById('search-result');
    searchresult.innerHTML = ``;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = ``;


  }
  else if (data.length !== 0) {
    const errorMessage = document.getElementById('error-message').style.display = "none";
    const searchresult = document.getElementById('search-result')
    searchresult.innerHTML = ``;
    console.log(data);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = ``;
    //making sure it doesnt show more than 20 search result***** 
    if (data.length > 20) {
      for (let i = 0; i < 20; i++) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${data[i].image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data[i].phone_name}</h5>
                <h6 class="card-text">${data[i].brand}</h6>
                <button onclick="loadDetail('${data[i].slug}')" class="btn btn-primary" type="button">See more</button>
            </div>
        </div>
        `
        searchresult.appendChild(div);

      }
    }
    else if (data.length <= 20) {
      data.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div  class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6 class="card-text">${phone.brand}</h6>
                <button onclick="loadDetail('${phone.slug}')" class="btn btn-primary" type="button">See more</button>
            </div>
        </div>
        `
        searchresult.appendChild(div);

      });

    }
  }




}
// detail section******
//fetching info for showing detail from API *****
const loadDetail = phoneID => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`
  fetch(url)
    .then(res => res.json())
    .then(result => displyDetail((result.data)));

}
// showing detail*****
const displyDetail = phone => {
  // showing release date****
  let releaseDate = undefined;
  if (phone.releaseDate === '') {
    releaseDate = 'No release date found';
  }
  else {
    releaseDate = phone.releaseDate;
  }
  const phoneDetails = document.getElementById('phone-details');
  // sensors****
  let sensors = phone.mainFeatures.sensors;
  let i = 0;
  let templateString = ``;
  while (i < sensors.length) {
    templateString = templateString + `<li> ${sensors[i]}</li>`;
    i++;
  }
  // Others****
  const othersList = objListMaker(phone.others)


  const div = document.createElement('div');
  div.innerHTML = `
    <div class="card mb-3 mx-auto" style="max-width: 640px;">
  <div class="row g-0">
    <div class="col-md-4 col-sm-12 my-auto mx-auto ">
      <img src="${phone.image}" class="img-fluid mx-auto d-block rounded-start" alt="...">
    </div>
    <div class="col-md-8 col-sm-12">
      <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>\
        <h6>Main Features</h6>
        <p class="card-text"> ${phone.mainFeatures.chipSet}</p>
        <p class="card-text"> ${phone.mainFeatures.displaySize}</p>
        <p class="card-text">${phone.mainFeatures.memory}</p>
        <h6>Sensors</h6>
        <ul> ${templateString}</ul>
        <h6>Others</h6>
        <ul> ${othersList}</ul>
        <p class="card-text"><small class="text-muted">${releaseDate}</small></p>
      </div>
    </div>
  </div>
</div>
    `
  phoneDetails.appendChild(div);
}
// function for list making from object properties
const objListMaker = object => {

  let objTemplateString = ``;
  for (const value in object) {
    objTemplateString = objTemplateString + `<li> ${value} : ${object[value]} </li>`;
  }
  return objTemplateString;
}