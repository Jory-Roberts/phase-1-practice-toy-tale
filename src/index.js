/*
Deliverables:
1. Add toy info to the card
2. add a new toy POST request
3.increase toy's likes

*/

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const addBtn = document.querySelector("#new-toy-btn");
console.log(addBtn);
const toyForm = document.querySelector(".container");
console.log(toyForm);

getToy = () => {
  return fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((data) => {
      let toyCollection = document.querySelector("#toy-collection");
      // console.log(toyCollection);

      data.forEach((toy) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const name = document.createElement("h2");
        name.textContent = toy.name;

        const image = document.createElement("img");
        image.src = toy.image;
        image.classList.add("toy-avatar");

        const likes = document.createElement("p");
        likes.textContent = `Likes: ${toy.likes}`;

        const likeBtn = document.createElement("button");
        likeBtn.classList.add("like-btn");
        likeBtn.id = toy.id;
        likeBtn.textContent = "Like";

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(likes);
        card.appendChild(likeBtn);

        toyCollection.appendChild(card);
      });
    });
};

console.log(getToy());

submitToyForm = (e) => {
  e.preventDefault();

  const name = document.querySelector('input[type="text"]').value;
  const image = document.querySelectorAll('input[type="image"]')
  console.log("this is name", name);
  console.log(image);
};
toyForm.addEventListener("submit", submitToyForm);

console.log(submitToyForm);

toyLikes = (toy) => {};
