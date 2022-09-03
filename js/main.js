// Function to create and display the category names as list items
const displayCategories = (categories) => {
    const categoryList = document.getElementById('category-list');

    for (let i=0; i<8; i++){
        const categoryListItem = document.createElement('li');

        categoryListItem.innerHTML = `
            <li class="nav-item mx-5">
                <button id="${categories.news_category[i].category_id}" class="btn btn-outline-secondary px-2 my-2 border-0 fs-5 fw-semibold" onclick=articleSearch('${categories.news_category[i].category_id}')>${categories.news_category[i].category_name}</button>
            </li>
        `;

        categoryList.appendChild(categoryListItem);
    }
}

// API call to get the category details
const loadCategories = async() => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data);
}

// Function call to dynamically load the category names
loadCategories();

//Function that controls the display of spinners
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

//Function to show the current number of articles being displayed
const displayArticleNumber = (articleNumber) => {
    const totalArticles = document.getElementById('total-articles');
    totalArticles.innerHTML = `
        <p  class="fs-3 fw-semibold">Currently ${articleNumber} articles are being displayed</p>
    `;
}

//If no news article exists in a category this section is toggled
const noNewsFound = (articleNumber) => {
    if(articleNumber == 0){
        
    }
    else{

    }
}

//Function to display the articles selected by the API
const displayArticles = (articles) => {
    const articleContainer = document.getElementById('article-container');

    articleContainer.innerHTML = ``;

    const articleNumber = articles.length;
    noNewsFound(articleNumber);
    displayArticleNumber(articleNumber);
}

//API Call to find the articles for selected category
const loadArticles = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    
    displayArticles(data.data);
}


// Function to find the articles of selected category
const articleSearch = (categoryId) => {
    toggleSpinner(true);
    loadArticles(categoryId);
} 