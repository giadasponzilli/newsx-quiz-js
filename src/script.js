document.addEventListener("DOMContentLoaded", ()=> {
  fetch("./articles.json")
  .then(response => response.json())
  .then(data => {
    const imgList = document.getElementById("imagesContainer")
    data.forEach(article => {
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


// when the page is opened the first card created is the last json file
// we need a function that dynamically creates a card with all the info of the article.
// add event listner of images, when images are clicked the previous function executes and the previous card disappear.

// the images should be displayed in reverse json file order