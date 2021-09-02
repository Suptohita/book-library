document.getElementById('search').addEventListener('click', function () {
  const userInput = document.getElementById('user-input').value;
  const bookUrl = `https://openlibrary.org/search.json?q=${userInput}`;


  fetch(bookUrl)
    .then(response => response.json())
    .then(data => showBook(data.docs));
});

const showBook = data => {
  const container = document.getElementById('show-book')
  data.forEach(data => {
    const bookName = data.title
    const author = data.author_name
    const publishDate = data.publish_date
    const publisher = data.publisher
    const cover = `https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`

    const div = document.createElement('div')
    div.innerHTML = `
        <div class="col mb-3">
        <div class="card">
            <div class="row g-0">
              <div class="col-md-4">
                <img style="width: 300px; height: 300px" src='${cover}' class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h4 class="card-title">${bookName}</h4>
                  <h6 class="text-muted">Author: ${author.slice(0,2)}</h6>
                  <h6 class="text-muted">First Publish Date: ${publishDate.slice(0, 1)}</h6>
                  <h6 class="text-muted">Publisher: ${publisher.slice(0, 2)}</h6>
                </div>
              </div>
            </div>
          </div>
          </div>
        `
    container.appendChild(div)
  })

};
