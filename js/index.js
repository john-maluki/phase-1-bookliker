const booksNode = document.querySelector("ul#list");
const bookShowPanelNode = document.querySelector("div#show-panel");

const createBookNode = (book) => {
  const li = document.createElement("li");
  li.textContent = book.title;
  li.id = book.id;
  li.addEventListener("click", handleBuildingBookPaneOnDom);
  booksNode.appendChild(li);
};

const buildBooksListOnDom = (books) => {
  books.forEach((book) => {
    createBookNode(book);
  });
};

const handleBuildingBookPaneOnDom = (e) => {
  const id = e.target.id;
  fetchBookByIdFromServer(id);
};

const fetchBooksFromServer = () => {
  fetch("http://localhost:3000/books")
    // get method.
    .then((res) => res.json())
    .then((data) => buildBooksListOnDom(data));
};

const fetchBookByIdFromServer = (id) => {
  fetch(`http://localhost:3000/books/${id}`)
    // get method.
    .then((res) => res.json())
    .then((book) => buildBookShowPaneOnDom(book));
};

const buildBookShowPaneOnDom = (book) => {
  const div = document.createElement("div");
  const ul = document.createElement("ul");
  const p = document.createElement("p");
  const img = document.createElement("img");

  p.textContent = book.description;
  img.src = book.img_url;
  book.users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.username;
    ul.appendChild(li);
  });

  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(ul);
  bookShowPanelNode.appendChild(div);
};

const init = () => {
  fetchBooksFromServer();
};

document.addEventListener("DOMContentLoaded", function () {
  init();
});
