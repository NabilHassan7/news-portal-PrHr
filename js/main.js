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
    const noNews = document.getElementById('no-news');
    if(articleNumber == 0){
        noNews.classList.remove('d-none');
    }
    else{
        noNews.classList.add('d-none');
    }
}

//Function to display the articles selected by the API
const displayArticles = (articles) => {
    const articleContainer = document.getElementById('article-container');

    articleContainer.innerHTML = ``;

    const articleNumber = articles.length;
    noNewsFound(articleNumber);
    displayArticleNumber(articleNumber);

    articles.sort(function(a,b) {
        return b.total_view - a.total_view;
    })
    
    articles.forEach(article => {
        const articleDiv = document.createElement('div');
         articleDiv.innerHTML=`
         <div class="card mb-3" style="">
         <div class="row g-0">
           <div class="col-md-4">
             <img src="${article.image_url}" class="img-fluid rounded-start" alt="">
           </div>
           <div class="col-md-8">
             <div class="card-body" style="">
               <h5 class="card-title">${article.title}</h5>
               <div style="height: 180px; overflow: hidden; text-overflow: ellipsis;">
                    <p class="card-text">${article.details}</p>
               </div>
               <div class="d-flex flex-row justify-content-between align-items-center">
                    <div class="d-flex flex-row">
                        <div>
                            <img src="${article.author.img}" style="width:40px;" class="rounded-pill d-none d-md-inline d-ld-inline d-xl-inline">
                        </div>
                        <div class="d-flex flex-column ms-1">
                            <div class="text-black fw-bold">
                                <p>${article.author.name ? article.author.name : 'Not available'}</P>
                            </div>
                            <div class="text-secondary fw-lighter" style="margin-top: -20px; font-size: 10px;">
                                <p>${article.author.published_date ? article.author.published_date : 'Not available'}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span><i class="fa-regular fa-eye"></i></span>
                        <span class="fw-bold">${article.total_view ? article.total_view : 'Not available' }</span>
                    </div>
                    <div>
                        <span><i class="fa-solid fa-arrow-right fa-lg"></i></span>
                    </div>
               </div>
             </div>
           </div>
        </div>
        </div>
         `
        articleContainer.appendChild(articleDiv);
    });

    //Stopping the spinner animation
    toggleSpinner(false);
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