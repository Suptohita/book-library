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
        const bookName = data.title;

        // authour

        if (data.author_name === 'undefined' || null || undefined){
            var author = 'Author not found'
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
        div.classList.add('col')
        div.innerHTML = `
         <div class="card mb-5" style="height: 400px; width: 300px; overflow-y: scroll; overflow-x: hidden">
          <img style="width: 300px; height: 250px" src="${cover}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${bookName}</h5>
            <h6 class="text-muted">Author: ${author}</h6>
            <h6 class="text-muted">Publish Date: ${publishDate}</h6>
            <h6 class="text-muted">Publisher: ${publisher}</h6>
          </div>
        </div>
        `;
        container.appendChild(div);
    });

};
