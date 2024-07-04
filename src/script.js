document.addEventListener("DOMContentLoaded", ()=> {
  fetch("./articles.json")
  .then(response => response.json())
  .then(data => {

    const imgList = document.getElementById("imagesContainer");

    //Generate first CardGuessTheHeadline when page is open

    const lastArticle = data[data.length - 1];
    //Image Card
    const imgCardDiv = document.getElementById("imgCardContainer");
    const imgCard = document.createElement("img");
    imgCard.src = lastArticle.image;
    imgCard.alt = lastArticle.altTextImg;
    imgCard.classList.add(   
      'rounded-lg');
    imgCardDiv.appendChild(imgCard);

    //Text Card
    const textContainer = document.getElementById("textContainer");
    const pTextCard = document.createElement("p");
    pTextCard.textContent = lastArticle.content;
    pTextCard.classList.add('p-8');
    textContainer.appendChild(pTextCard);
    const pAuthorTextCard = document.createElement("p");
    pAuthorTextCard.textContent = lastArticle.author
    pAuthorTextCard.classList.add('font-bold');
    pAuthorTextCard.style.paddingTop = '2rem';
    pTextCard.appendChild(pAuthorTextCard)




    // Iterate through each element in the json file and print a small image on the page as a menu
    data.reverse().forEach(article => {
      const img = document.createElement("img");
      img.src = article.image
      img.alt = article.title;
      img.dataset.id = article.id;
      img.style.width = 'auto';
      img.style.height = '100px';
      img.style.margin = '100px 10px 50px 10px';
      img.classList.add('rounded', 'shadow-md');
     // img.classList.add('w-auto', 'h-24', 'm-4', 'rounded', 'shadow-md');
      imgList.appendChild(img)
    });
  })
  .catch(error => console.error('Error fetching articles:', error));
})






// The function should say headline displaying ??? now should be replaced with the real headline which was hide.
const headlineText = document.getElementById("headline")
const revealHeadlineButton = document.getElementById("revealHeadline")

let headlineVisible = false; // Track the visibility state of the headline

function revealHeadline() {

  if (!headlineVisible) {
  headlineText.textContent = "CANE MU-TON-Y:"
  const subHeading = document.createElement("h3")
  subHeading.textContent = "MASSIVE CANE TOAD HAS WEIGH TO GO"
  subHeading.classList.add("flex", "justify-center", "text-2xl", "m-10");
  headlineText.insertAdjacentElement("afterend", subHeading);
  revealHeadlineButton.textContent = "Hide Headline"
  headlineVisible = true; // Update visibility state
  } else {
    // Hide the headline
    headlineText.textContent = "???";
    const subHeading = document.querySelector("h3");
    if (subHeading) {
      subHeading.remove();
    }
    revealHeadlineButton.textContent = "Reveal Headline";
    headlineVisible = false; // Update visibility state
  }
}

// The button reveal headline should wait for an event listener
revealHeadlineButton.addEventListener("click", revealHeadline)


//// when the page is opened the first card created is the last json file
// we need a function that dynamically updates the card info with all the info of the article.
// add event listner of images, when images are clicked the previous function executes and the previous card disappear.
// Hover on navBar button and reveal headline button

// add arrows to go to next article
////the images should be displayed in reverse json file order