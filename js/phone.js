const searchFood = () => {
    const searchfield = document.getElementById('search-field')
    const searchText = searchfield.value;
    // console.log(searchText)
    searchfield.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(result => dispaySearchResult(result.data))
}
const dispaySearchResult = data => {
    const searchresult = document.getElementById('search-result')
    searchresult.innerHTML = ``;
    const mealDetails = document.getElementById('meal-details');
    mealDetails.innerHTML = ``;
    data.forEach(phone => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadDetail('${phone.slug}')" class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    // <p class="card-text">phone details
                    <br>(see more)...</p>
                </div>
            </div>
        `
        searchresult.appendChild(div);


    });
}
const loadDetail = phoneID => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`
    fetch(url)
        .then(res => res.json())
        .then(result => displyDetail((result.data)));

}
const displyDetail = phone => {
    console.log(phone)
    let releaseDate = undefined;
    if (phone.releaseDate === '') {
        releaseDate = 'No release date found';
    }
    else {
        releaseDate = phone.releaseDate;
    }
    const mealDetails = document.getElementById('meal-details');
    mealDetails.innerHTML = ``;
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mb-3 mx-auto" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4 my-auto mx-auto ">
      <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text"> ${phone.mainFeatures.chipSet}</p>
        <p class="card-text"> ${phone.mainFeatures.displaySize}</p>
        <p class="card-text">${phone.mainFeatures.memory}</p>
        <p class="card-text"><small class="text-muted">${releaseDate}</small></p>
      </div>
    </div>
  </div>
</div>
    `
    mealDetails.appendChild(div);
}
