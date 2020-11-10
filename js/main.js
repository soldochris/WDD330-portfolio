const links = [
  {
    label: "Week1 notes",
    url: "week1/index.html"
  },
  {
    label: "Week2 notes",
    url: "week2/index.html"
  },
  {
    label: "Week3 notes",
    url: "week3/index.html"
  },
  {
    label: "Week4 notes",
    url: "week4/index.html"
  },
  {
    label: "Week5 notes",
    url: "week5/index.html"
  },
  {
    label: "Challenge one: Todo app",
    url: "Todo/index.html"
  },
  {
    label: "Week7 notes",
    url: "week7/index.html"
  },
  {
    label: "Week8 notes",
    url: "week8/index.html"
  },
  {
    label: "Week9 notes",
    url: "week9/index.html"
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