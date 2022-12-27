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
document.addEventListener("DOMContentLoaded", getAllToys);
// let form = document.querySelector('form');
// let createToyBtn = form.querySelector('input[name="submit"]');
let createToyBtn = document.querySelector(".container")
createToyBtn.addEventListener('submit', handleSubmit);


//Event handler
function handleSubmit(e){
  e.preventDefault()
  let newToyObject ={
    name : e.target.name.value,
    image : e.target.image.value,
    likes : 0
  }
  console.log(newToyObject)

  renderOneToy([newToyObject])
  addANewToy(newToyObject)
}



//DOM render function

function renderOneToy(toys){
  const collection = document.querySelector("#toy-collection")
  toys.forEach(toy =>{
  let card = document.createElement('div')
  
  card.className = "card";
  card.innerHTML = `
   <h2> ${toy.name}</h2>
   <img src = ${toy.image} class = "toy-avatar" />
   <p> ${toy.likes} Likes </p>
   <button class = "like-btn" id = ${toy.id}>Like</button>
   `
   let likeBtn = card.querySelectorAll(".like-btn");
   likeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
    toy.likes+=1;
    card.querySelector('p').textContent = toy.likes + " Likes";
    updateLikes(toy)
   }
   )
   
  //  const likeButtons = document.getElementsByClassName("like-btn");
  //  for (var i=0; i<likeButtons.length;i++){
  //    buttons[i].addEventListener('click', () => console.log ("ok"))

    collection.appendChild(card)
   })
})
}

//Fetch request

function getAllToys(){
  fetch("http://localhost:3000/toys")
  .then (res => res.json())
  .then (toys => renderOneToy(toys))  
}

function addANewToy(newToyObject){
  fetch("http://localhost:3000/toys",{
    method : 'POST',
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"},

body: JSON.stringify(newToyObject)
  })
  .then (res => res.json())
  .then (toy => console.log(toy))
}

function updateLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method:'PATCH',
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify(toy)
  })
  .then(res=>res.json())
  .then(toy=>console.log(toy))
}
