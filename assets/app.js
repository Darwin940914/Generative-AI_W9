document.addEventListener("DOMContentLoaded", function () {
  const gridEl = document.getElementById("articles-grid");
  const filtersEl = document.getElementById("category-filters");
  const searchInput = document.getElementById("search-input");
  const countEl = document.getElementById("article-count");

  let allArticles = [];
  let currentCategory = "all";
  let currentKeyword = "";

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function renderCategoryButtons(articles) {
    const categories = [];
    for (let i = 0; i < articles.length; i++) {
      const cat = articles[i].category;
      if (cat && categories.indexOf(cat) === -1) {
        categories.push(cat);
      }
    }

    let html = '<button type="button" class="filter-btn active" data-category="all">全部</button>';
    for (let i = 0; i < categories.length; i++) {
      const safeCat = escapeHtml(categories[i]);
      html += '<button type="button" class="filter-btn" data-category="' + safeCat + '">' + safeCat + "</button>";
    }
    filtersEl.innerHTML = html;

    const buttons = filtersEl.querySelectorAll(".filter-btn");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        for (let j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove("active");
        }
        this.classList.add("active");
        currentCategory = this.getAttribute("data-category");
        renderArticles();
      });
    }
  }

  function renderArticles() {
    const filtered = [];
    const keyword = currentKeyword.trim().toLowerCase();

    for (let i = 0; i < allArticles.length; i++) {
      const item = allArticles[i];
      const matchCategory = currentCategory === "all" || item.category === currentCategory;

      let matchKeyword = true;
      if (keyword !== "") {
        const haystack = (
          item.title + " " +
          item.category + " " +
          item.difficulty + " " +
          item.summary
        ).toLowerCase();
        matchKeyword = haystack.indexOf(keyword) !== -1;
      }

      if (matchCategory && matchKeyword) {
        filtered.push(item);
      }
    }

    countEl.textContent = "共 " + filtered.length + " 篇筆記";

    if (filtered.length === 0) {
      gridEl.innerHTML = '<div class="empty-state">找不到符合條件的解題筆記。</div>';
      return;
    }

    let cardsHtml = "";
    for (let i = 0; i < filtered.length; i++) {
      const art = filtered[i];
      cardsHtml +=
        '<a class="article-card" href="' + escapeHtml(art.path) + '">' +
          '<div class="card-meta">' +
            '<span class="tag-category">' + escapeHtml(art.category) + "</span>" +
            '<span class="tag-difficulty">' + escapeHtml(art.difficulty) + "</span>" +
            '<span class="card-date">' + escapeHtml(art.date) + "</span>" +
          "</div>" +
          '<h2 class="card-title">' + escapeHtml(art.title) + "</h2>" +
          '<p class="card-summary">' + escapeHtml(art.summary) + "</p>" +
        "</a>";
    }

    gridEl.innerHTML = cardsHtml;
  }

  searchInput.addEventListener("input", function () {
    currentKeyword = this.value;
    renderArticles();
  });

  fetch("data/articles.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("無法讀取文章清單");
      }
      return response.json();
    })
    .then(function (data) {
      allArticles = data;
      renderCategoryButtons(allArticles);
      renderArticles();
    })
    .catch(function (error) {
      countEl.textContent = "載入失敗";
      gridEl.innerHTML = '<div class="empty-state">讀取 data/articles.json 失敗，請確認是否透過本地伺服器或 GitHub Pages 開啟。</div>';
      console.error(error);
    });
});