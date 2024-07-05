document.addEventListener("DOMContentLoaded", () => {

  let currentArticle = null; // Variable to store the currently displayed article

  fetch("./articles.json")
    .then(response => response.json())
    .then(data => {

      const imagesContainer = document.getElementById("imagesContainer");

      //Generate first CardGuessTheHeadline when page is open

      const lastArticle = data[data.length - 1];
      updateCard(lastArticle)

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

        //Add event listener for each image, so that when an image is clicked the previous card disappear and the one which has been clicked will be shown.
        img.addEventListener("click", () => updateCard(article));
        imagesContainer.appendChild(img)

      });
    })
    .catch(error => console.error('Error fetching articles:', error));



  // Function that dynamically updates the card info with all the info of the article
  function updateCard(article) {
    //Update Image Card
    const imgCardDiv = document.getElementById("imgCardContainer");
    imgCardDiv.innerHTML = "";
    const imgCard = document.createElement("img");
    imgCard.src = article.image;
    imgCard.alt = article.altTextImg;
    imgCard.classList.add('rounded-lg');
    imgCardDiv.appendChild(imgCard);

    //Update Text Card
    const textContainer = document.getElementById("textContainer");
    textContainer.innerHTML = "";
    const pTextCard = document.createElement("p");
    pTextCard.textContent = article.content;
    pTextCard.classList.add('p-8');
    textContainer.appendChild(pTextCard);
    const pAuthorTextCard = document.createElement("p");
    pAuthorTextCard.textContent = article.author
    pAuthorTextCard.classList.add('font-bold');
    pAuthorTextCard.style.paddingTop = '2rem';
    pTextCard.appendChild(pAuthorTextCard);

    //Update headline text and remove subheading if it exists
    headlineText.textContent = "???"
    const existingSubHeading = document.querySelector("h3")
    if (existingSubHeading) {
      existingSubHeading.remove()
    }

    // Update the reveal headline button text and reset visibility state
    revealHeadlineButton.textContent = "Reveal Headline";
    headlineVisible = false;

    // Store current article to use it later for headline and subheading
    currentArticle = article;
  }


  // The function to toggle the headline
  const headlineText = document.getElementById("headline");
  const revealHeadlineButton = document.getElementById("revealHeadline");

  let headlineVisible = false; // Track the visibility state of the headline

  function revealHeadline() {

    if (!headlineVisible) {
      headlineText.textContent = currentArticle.headline;
      const subHeading = document.createElement("h3")
      subHeading.textContent = currentArticle.subheading;
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

});


  //// when the page is opened the first card created is the last json file
  //// we need a function that dynamically updates the card info with all the info of the article.
  //// add event listener of images, when images are clicked the previous function executes and the previous card disappear.
  // Make the headline reveal reusable
  // Hover on navBar button and reveal headline button

  // Add arrows to go to next article
  ////the images should be displayed in reverse json file order


