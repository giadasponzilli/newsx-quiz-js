document.addEventListener("DOMContentLoaded", () => {

  // Variable to store the currently displayed article
  let currentArticle = null; 
  // Variable to store the index of the currently displayed article
  let currentArticleIndex = 0; 
  // Variable to store the articles data
  let articles = []; 

  fetch("./articles.json")
    .then(response => response.json())
    .then(data => {
      articles = data;
      console.log(articles);
      

      const imagesContainer = document.getElementById("imagesContainer");

      //Generate first CardGuessTheHeadline when page is open

      const lastArticle = articles[articles.length - 1];
      updateCard(lastArticle)

      // Iterate through each element in the json file and print a small image on the page as a menu
      articles.reverse().forEach((article, index) => {
        const img = document.createElement("img");
        img.src = article.image
        img.alt = article.title;
        img.dataset.id = article.id;
        img.classList.add('w-auto', 'h-24', 'mt-12','rounded', 'shadow-md');

        //Add event listener for each image, so that when an image is clicked the previous card disappear and the one which has been clicked will be shown.
        img.addEventListener("click", () => { 
          currentArticleIndex = index;
          updateCard(article);
        });
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
    imgCard.classList.add('rounded-lg', 'shadow-md');
    imgCardDiv.appendChild(imgCard);

    //Update Text Card
    const textContainer = document.getElementById("textContainer");
    textContainer.innerHTML = "";
    const pTextCard = document.createElement("p");
    pTextCard.textContent = article.content;
    pTextCard.classList.add('p-8', 'text-xl');
    textContainer.appendChild(pTextCard);
    const pAuthorTextCard = document.createElement("p");
    pAuthorTextCard.textContent = article.author
    pAuthorTextCard.classList.add('font-bold', 'pt-8');
    pTextCard.appendChild(pAuthorTextCard);

    //Update headline text and remove subheading if it exists
    headlineText.textContent = "???"
    const existingSubHeading = document.getElementById("subHeading")
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
      headlineText.classList.add('text-gray-900')
      const subHeading = document.createElement("h3")
      subHeading.textContent = currentArticle.subheading;
      subHeading.classList.add("flex", "justify-center", "text-2xl", "m-10", "font-serif");
      subHeading.id = "subHeading";
      headlineText.insertAdjacentElement("afterend", subHeading);
      revealHeadlineButton.textContent = "Hide Headline"
      headlineVisible = true; // Update visibility state
    } else {
      // Hide the headline
      headlineText.textContent = "???";
      const subHeading = document.getElementById("subHeading");
      if (subHeading) {
        subHeading.remove();
      }
      revealHeadlineButton.textContent = "Reveal Headline";
      headlineVisible = false; // Update visibility state
    }
  }

  // The button reveal headline should wait for an event listener
  revealHeadlineButton.addEventListener("click", revealHeadline)


  // Navigation with arrow to next article
  function nextArticle() {
    if (currentArticleIndex < articles.length - 1) {
      currentArticleIndex++;
    } else {
      // Loop back to the first article
      currentArticleIndex = 0;
    }
    updateCard(articles[currentArticleIndex]);
  }

  // Navigation with arrow to previous article
  function previousArticle() {
    if (currentArticleIndex > 0) {
      currentArticleIndex--;
    } else {
      // Loop back to the last article
      currentArticleIndex = articles.length - 1;
    }
    updateCard(articles[currentArticleIndex]);
  }

  const buttonArrowRight = document.getElementById("buttonArrowRight");
  buttonArrowRight.addEventListener("click", nextArticle)

  const buttonArrowLeft = document.getElementById("buttonArrowLeft");
  buttonArrowLeft.addEventListener("click", previousArticle)

});






// Social Media Buttons
function shareOnFacebook() {
  const url = window.location.href;
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
  const url = window.location.href;
  const text = document.title; // Use the page title as the text
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn() {
  const url = window.location.href;
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnPinterest() {
  const url = window.location.href;
  const description = document.title; // Use the page title as the description
  const image = document.querySelector('meta[property="og:image"]').getAttribute('content'); // Get the image URL from the meta tag
  const shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareByEmail() {
  const subject = document.title; // Use the page title as the subject
  const body = `Check out this link: ${window.location.href}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}




  //social media buttons make sure they work
  ////card with possibility to send email to buy an headline
  //connect form to email JS
  ////make sure h3 can be visible on the page (problem in javascript)
  //Add footer
  ////Style the navBar buttons in a different way

  //Adjust all articles and pictures
  //make sure it is responsive
  //Search AI