// Image hover
document.querySelectorAll(".book-img-wrapper").forEach((wrapper) => {
  const btn = wrapper.querySelector(".menu-btn");
  const menu = wrapper.querySelector(".menu");

  btn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      menu.style.display = "none";
    }
  });
});

//Add Module

const modules = document.querySelectorAll(".module");

const addQuotes = document.querySelector("#addQuote");

const addBook = document.querySelector("#addBook");

modules.forEach((item) => {
  item.addEventListener("click", () => {
    modules.forEach((el) => el.classList.remove("active-add"));
    item.classList.add("active-add");
    if (item.classList.contains("change-quotes")) {
      addQuotes.style.display = "block";
      addBook.style.display = "none";
    } else {
      addQuotes.style.display = "none";
      addBook.style.display = "block";
    }
  });
});

//Book status

const bookStatus = document.querySelectorAll(".book-status span");

bookStatus.forEach((item) => {
  item.addEventListener("click", () => {
    bookStatus.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  });
});
