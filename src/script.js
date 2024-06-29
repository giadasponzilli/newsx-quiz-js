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
      img.classList.add('w-full', 'h-auto', 'rounded', 'shadow-md');
      imgList.appendChild(img)
    });
  })
  .catch(error => console.error('Error fetching articles:', error));
})