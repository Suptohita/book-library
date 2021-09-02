document.getElementById('search').addEventListener('click', function () {
    const userInput = document.getElementById('user-input').value;
    const bookUrl = `https://openlibrary.org/search.json?q=${userInput}`;

    // cleaning
    document.getElementById('show-book').innerHTML = '';
    document.getElementById('error').innerText = ''

    // fetching data

    fetch(bookUrl)
        .then(response => response.json())
        .then(data => showBook(data, data.docs));
});

// search result

const showBook = (fullData, data) => {
    const err = document.getElementById('error').innerText = `${fullData.numFound} result found !!`;
    const container = document.getElementById('show-book');
    data.forEach(data => {
        console.log(data)
        const bookName = data.title;

        // authour

        if (data.author_name === undefined  || null){
            var authour = 'Author not found'
        }
        else {
            var author = data.author_name;
        }


        const publishDate = data.first_publish_year;
        const publisher = data.publisher;

        // cover
        if (data.cover_i === undefined || null) {
            var cover = 'images/download.png';
        }
        else {
            var cover = `https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`;
        }

        const div = document.createElement('div');
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
                  <h6 class="text-muted">Author: ${author}</h6>
                  <h6 class="text-muted">First Publish Date: ${publishDate}</h6>
                  <h6 class="text-muted">Publisher: ${publisher}</h6>
                </div>
              </div>
            </div>
          </div>
          </div>
        `;
        container.appendChild(div);
    });

};
