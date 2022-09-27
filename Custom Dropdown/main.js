const wrapper = document.querySelector('.wrapper');
const options = document.querySelector('.options');
const btnSelect = document.querySelector('.select__btn');
const searchBar = document.querySelector('.search > input');
const countries = [];

btnSelect.addEventListener('click', () => {
  wrapper.classList.toggle('active');
})

fetchData();


async function fetchData() {
  await fetch('./countries.json')
    .then(response => response.json())
    .then(data => {countries.push(...data); addCountries(countries);})
}

function addCountries(countries) {
  countries.forEach(country => {
    let li = `<li onclick="chooseItem(this)">${country.name}</li>`
    options.insertAdjacentHTML("beforeend", li);
  });
}

function chooseItem(selectedItem) {
  btnSelect.firstElementChild.innerText = selectedItem.innerText;
  // Reset list
  wrapper.classList.remove('active');
  searchBar.value = "";
  options.innerHTML = '';
  addCountries(countries);
}

searchBar.addEventListener('input', event => {
  const newData = countries.filter(country => {
    return country.name.toLowerCase().startsWith(event.target.value.toLowerCase());
  }).map(country => {
    return `<li onclick="chooseItem(this)">${country.name}</li>`;
  }).join('')

  options.innerHTML = newData ? newData : `<p>Oops! country not found</p>`;
});