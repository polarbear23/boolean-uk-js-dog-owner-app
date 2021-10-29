console.log(data);

// WRITE YOUR CODE BELOW!

function createDogs(){
    const cardContainer = document.querySelector(".dogs-list");

        for (let i = 0; i < data.length; i++) {
            cardContainer.appendChild(createADogItem(i));
            //main.appendChild(createDogMainCard(i));

        }
}

function createADogItem(indexOfDog){
    const dogItem = document.createElement("li");
    dogItem.setAttribute("class","dogs-list__button");
    dogItem.setAttribute("onclick","");
    dogItem.setAttribute("id", indexOfDog);
    const dogName = data[indexOfDog].name;
    dogItem.innerText= dogName;
    dogItem.addEventListener("click",(e)=>{
        const dogCardArr = document.querySelectorAll(".main__dog-section");
        const main = document.querySelector("main");
       //console.log(dogCardArr);
        main.appendChild(createDogMainCard(e.target.getAttribute("id")));
        for(let i = 0; i < dogCardArr.length; i++){
            //console.log(dogCardArr[i]);
            if(dogCardArr[i].getAttribute("idOfDog") !== e.target.getAttribute("id")){
                dogCardArr[i].remove();
            }
            if(dogCardArr[i].getAttribute("idOfDog") === e.target.getAttribute("id")){
                dogCardArr[i].remove();
            }
    }
    });
    return dogItem;
}



function createDogMainCard(indexOfDog){
    const dogMainSection = document.createElement("section");
    dogMainSection.setAttribute("class", "main__dog-section");
    dogMainSection.setAttribute("idOfDog",indexOfDog);
    createDogHeader(indexOfDog, dogMainSection);
    dogMainSection.appendChild(createDogDesc(indexOfDog));
    dogMainSection.appendChild(createDogButtonSection(indexOfDog));
    return dogMainSection;
}

function createDogHeader(indexOfDog, mainSection){
    const dogNameEl = document.createElement("h2");
    const dogNameValue = data[indexOfDog].name;
    dogNameEl.innerText = dogNameValue;
    const dogImage = document.createElement("img");
    const dogImageSrc = data[indexOfDog].image;
    dogImage.setAttribute("src", dogImageSrc);
    mainSection.append(dogNameEl, dogImage);
}

function createDogDesc(indexOfDog){
    const descSection = document.createElement("section");
    const bioHeading = document.createElement("h3");
    bioHeading.innerText = "Bio";
    const bioText = document.createElement("p");
    bioText.innerText = data[indexOfDog].bio;
    descSection.append(bioHeading, bioText);
    return descSection;
}

function createDogButtonSection(indexOfDog){
    const dogButtonDiv = document.createElement("div");
    dogButtonDiv.setAttribute("class", "main__dog-section__btn");
    const dogNaughtyText = document.createElement("p");
    const isGoodDogTextContainer = document.createElement("span");
    const isGoodDog = data[indexOfDog].isGoodDog;
    const dogNaughtyEm = document.createElement("em");
    const goodDogButton = document.createElement("button");
    dogNaughtyEm.innerText ="Is naughty?";
    if(isGoodDog === true){
        isGoodDogTextContainer.innerText = "No!";
        goodDogButton.innerText = "Bad dog!";
    }
    else{
        isGoodDogTextContainer.innerText = "Yes!";
        goodDogButton.innerText = "Good dog!";

    }
    dogNaughtyText.appendChild(dogNaughtyEm);
    dogNaughtyText.appendChild(isGoodDogTextContainer);
    dogButtonDiv.append(dogNaughtyText, goodDogButton);
    goodDogButton.addEventListener("click",(e)=>{
        if(e.target.innerText === "Good dog!"){
            e.target.innerText = "Bad dog!"
            isGoodDogTextContainer.innerText = "No!";
        }
        else{
            e.target.innerText = "Good dog!";
            isGoodDogTextContainer.innerText = "Yes!";

        }
    });

    return dogButtonDiv;
}

function addForm(){
    const formAddButton = document.querySelector("li");
    formAddButton.addEventListener("click",(e)=>{
        const dogCardArr = document.querySelectorAll(".main__dog-section");
        const main = document.querySelector("main");
       //console.log(dogCardArr);
        main.appendChild(createForm());
        formHandler(e.target);
        for(let i = 0; i < dogCardArr.length; i++){
            //console.log(dogCardArr[i]);
            dogCardArr[i].remove();
    }
    });

}
function formHandler(elementBefore){
    const form = document.querySelector("form");
    console.log(form);
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const inputArr = form.querySelectorAll("input");
        const textArea = form.querySelector("textarea");
        const name = inputArr[0].value;
        const image = inputArr[1].value;
        const bio = textArea.value;
        console.log(bio);
        addADog(name, bio, image, elementBefore);
    })
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createForm(){
    const formSection = document.createElement("section");
    formSection.setAttribute("class","main__dog-section");
    formSection.innerHTML= `
    <h2>Add a new Dog</h2>
    <form class="form">

      <label for="name">Dog's name</label>
      <input type="text" id="name" name="name">

      <label for="image">Dog's picture</label>
      <input type="url" id="image" name="image">

      <label for="bio">Dog's bio</label>
      <textarea rows="5" id="bio" name="bio"></textarea>

      <input type="submit" id="submit" name="submit" value="Let's add a dog!" class="form__button">
    </form>
`
    return formSection;
}


function addADog(name,bio,img, elementBefore){
    //const cardContainer = document.querySelector(".dogs-list");
    const dog = {
        id: data.length,
        name: name,
        bio: bio,
        isGoodDog: true,
        image: img
      }
      data.push(dog);
      console.log(elementBefore);
      insertAfter(elementBefore, createADogItem(data.length-1));
      
}

createDogs();
addForm();
