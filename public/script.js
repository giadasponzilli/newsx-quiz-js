document.addEventListener("DOMContentLoaded", () => {

  //When hamburger icon is clicked navlinks show up
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("hidden");
  });

  // Variable to store the currently displayed article
  let currentArticle = null;
  // Variable to store the index of the currently displayed article
  let currentArticleIndex = 0;
  // Variable to store the articles data
  let articles = [];

  fetch("/data/articles.json")
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

        const singleImgContainer = document.createElement('div');
        singleImgContainer.classList.add('single-image-container-menu');

        const img = document.createElement('img');
        img.src = article.image
        img.alt = article.altTextImg;
        img.dataset.id = article.id;
        singleImgContainer.appendChild(img);
        imagesContainer.appendChild(singleImgContainer)

        //Add event listener for each image, so that when an image is clicked the previous card disappear and the one which has been clicked will be shown.
        img.addEventListener('click', () => {
          currentArticleIndex = index;
          updateCard(article);
          headlineText.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

      });
    })
    .catch(error => console.error('Error fetching articles:', error));

  // Function to truncate content
  function truncateContent(content, maxLength) {
    if (content.length <= maxLength) return content;
    let truncated = content.substr(0, maxLength);
    // Ensure we don't cut off a word
    truncated = truncated.substr(0, Math.min(truncated.length, truncated.lastIndexOf(" ")));
    return truncated + '...';
  }

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
    
    let maxLength;

    if (window.innerWidth >= 768) {
      maxLength = 1000; // Character limit
    } else {
      maxLength = 200; // Character limit
    } 

    const truncatedContent = truncateContent(article.content, maxLength);

    const pTextCard = document.createElement("p");
    pTextCard.textContent = truncatedContent;
    pTextCard.classList.add('text-xl');
    textContainer.appendChild(pTextCard);

    // Add read more button
    const readMoreButton = document.createElement("button");
    readMoreButton.textContent = "Read More";
    readMoreButton.classList.add('read-more', 'font-bold', 'hover:text-custom-color-purple-hover');
    pTextCard.appendChild(readMoreButton);

    // Event listener for read more button
    readMoreButton.addEventListener("click", () => {
      pTextCard.textContent = article.content;
    });

    const pAuthorTextCard = document.createElement("p");
    pAuthorTextCard.textContent = article.author
    pAuthorTextCard.classList.add('font-bold', 'text-xl');
    pAuthorTextCard.style.paddingTop = '20px';
    textContainer.appendChild(pAuthorTextCard);


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
      const subHeading = document.createElement("h2")
      subHeading.textContent = currentArticle.subheading;
      subHeading.classList.add("flex", "justify-center", "mt-4", "mb-10", "mx-10");
      
      // Add responsiveness to subHeading text dimension
      function applyResponsiveClassSubHeading() {
        if (window.innerWidth >= 1024) {
          subHeading.classList.add('text-4xl');
          subHeading.classList.remove('text-2xl', 'text-sm');
          console.log('Applied text-4xl');
        } else if (window.innerWidth >= 768) {
          subHeading.classList.add('text-2xl');
          subHeading.classList.remove('text-4xl', 'text-sm');
          console.log('Applied text-2xl');
        } else {
          subHeading.classList.add('text-sm');
          subHeading.classList.remove('text-4xl', 'text-2xl');
          console.log('Applied text-sm'); 
        }
      }
      // Apply responsive classes on page load
      applyResponsiveClassSubHeading();
      // Update on window resize
      window.addEventListener('resize', applyResponsiveClassSubHeading);
      
      subHeading.id = "subHeading";
      headlineText.insertAdjacentElement("afterend", subHeading);
      revealHeadlineButton.textContent = "Hide Headline"
      headlineVisible = true; // Update visibility state


      // Scroll to the headline only on small screens
      // if (window.innerWidth < 1024) {
      headlineText.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // }

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

  const buttonPolicy = document.getElementById("buttonPolicy");
  const switchThumb = document.getElementById('switchingPolicy');

  buttonPolicy.addEventListener('click', function(){
    const isChecked = buttonPolicy.getAttribute('aria-checked') === 'true';

    if (isChecked) {
      buttonPolicy.setAttribute('aria-checked', 'false');
      buttonPolicy.classList.remove('bg-indigo-600');
      buttonPolicy.classList.add('bg-gray-200');
      switchThumb.classList.remove('translate-x-3.5');
      switchThumb.classList.add('translate-x-0');
    } else {
      buttonPolicy.setAttribute('aria-checked', 'true');
      buttonPolicy.classList.remove('bg-gray-200');
      buttonPolicy.classList.add('bg-indigo-600');
      switchThumb.classList.remove('translate-x-0');
      switchThumb.classList.add('translate-x-3.5');

    }

  })
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
  const recipient = 'queries@newsx.media'
  const subject = document.title; // Use the page title as the subject
  const body = `Check out this link: ${window.location.href}`;
  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}



//Add favicon
//Social media buttons make sure they work
//Connect form to email JS - need email from newsX, make sure that policy is clicked before sending email and all field are completed