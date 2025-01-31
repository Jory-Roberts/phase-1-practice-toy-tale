/*
Deliverables:
1. Add toy info to the card
2. add a new toy POST request
3.increase toy's likes
*/

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
   addingEventListeners();
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

addingEventListeners = () => {
   toyForm.addEventListener("submit", postToy);
};

const renderToy = (toy) => {
   let toyCollection = document.querySelector("#toy-collection");

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
   likeBtn.addEventListener("click", () => {
      toy.likes++;

      likes.textContent = `Likes: ${toy.likes}`;
      updateToyLikes(toy.id, toy.likes);
   });

   card.appendChild(name);
   card.appendChild(image);
   card.appendChild(likes);
   card.appendChild(likeBtn);

   toyCollection.appendChild(card);
};

const getToy = () => {
   return fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => {
         data.forEach(renderToy);
      });
};

getToy();

const postToy = (e) => {
   e.preventDefault();
   const formData = Object.fromEntries(new FormData(e.target));
   console.log(formData);

   fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
      },
      body: JSON.stringify({ ...formData, likes: 0 }),
   })
      .then((res) => res.json())
      .then((toy) => {
         renderToy(toy);
      })
      .catch((error) => {
         console.error("Error adding toy:", error);
      });
};

console.log(postToy);

const updateToyLikes = (toyId, likes) => {
   fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes }),
   })
      .then((res) => res.json())
      .then((data) => {
         console.log("Likes updated successfully:", data.likes);
      })
      .catch((error) => {
         console.error("Error updating likes:", error);
      });
};
