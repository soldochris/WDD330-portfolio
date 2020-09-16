const links = [
  {
    label: "Week1 notes",
    url: "week1/index.html"
  }
];

const list = document.getElementById("list");

links.forEach(link => {
  let newLi = document.createElement('li');
  let newA = document.createElement('a');
  newA.textContent = link.label;
  newA.setAttribute('href',link.url);
  newLi.appendChild(newA);
  list.appendChild(newLi);
});