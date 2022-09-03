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
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data);
    }
    catch(error){
        console.log(error);
    }
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

    //Sorting the articles according to descending number of views
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
                    <p class="card-text">${(article.details).slice(0,300)+' ...'}</p>
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
                        <button onclick="updateModal('${article._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details<i class="fa-solid fa-arrow-right ms-2"></i></button>
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
    try{
        const res = await fetch(url);
        const data = await res.json(); 
        displayArticles(data.data);
    }
    catch(error){
        console.log(error);
    }
}


// Function to find the articles of selected category
const articleSearch = (categoryId) => {
    toggleSpinner(true);
    loadArticles(categoryId);
}

//Modal Section
// const displayArticleDetails = (articleDetails) =>{
//     const modalTitle = document.getElementById('articleModalLabel');
//     modalTitle.innerText = articleDetails[0].title;
//     const articleModalDetails = document.getElementById('article-details');
//     articleModalDetails.innerHTML = `
//         <img src="${articleDetails.image_url}" class="img-fluid rounded-start" alt="">
//     `
// } 

// const loadArticleDetails = async (article) =>{
//     const url = `https://openapi.programming-hero.com/api/news/${article}`;
//     const res = await fetch(url);
//     const data = await res.json();

//     displayArticleDetails(data.data);
// }

//Modal Section

// update modal
const updateModal = async(newsId) => {
    console.log(newsId);
    url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayModal(data.data);
    }
    catch(error){
        console.log(error);
    }
}

// displayModal
const displayModal = news => {
    // console.log(news);
    const modalTitle = document.getElementById('exampleModalLabel');
    const modalText = document.getElementById('modal-text');
    modalTitle.innerHTML = `
    <div class="d-flex flex-column align-items-center">
        <div>
            <img class="img-fluid" style="width:300px;" src="${news[0].image_url}">
        </div>
        <div>
            <h2 class="text-center">${news[0].title}</h2>
        </div>
    </div>
    `;
    modalText.innerHTML = `
    ${news[0].details}
    <br>
    <br>

    <img style="height:80px;" class="img-fluid rounded-circle" src="${news[0].author.img}">

    <p>Author: <strong> ${news[0].author.name ? news[0].author.name: 'No information found'} </strong> </p>

    <p>Published Date: ${news[0].author.published_date ? news[0].author.published_date: 'No information found'}</p>

    <p>Total Views: ${news[0].total_view ? news[0].total_view: 'No information found'}</p>
    `;
}

/* Function to display the blog section of the website */

const showBlogContent = () =>{
    toggleSpinner(true);

    const blogContainer = document.getElementById('article-container');

    blogContainer.innerHTML = ``;

    const blogDiv = document.createElement('div');
    blogDiv.innerHTML=`
    <div class="accordion mx-5" id="accordionPanelsStayOpenExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-headingOne">
        <button class="accordion-button fw-bold fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
          #1 What are the differences between the var and the let constants?
        </button>
      </h2>
      <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div class="accordion-body fw-semibold fs-5">
          The differences between var and let variable declaration in JavaScript include:
          Variables declared with var is scoped to the immediate function body.
          Variables declared with the var keyword are hoisted. Hoisting means that the variable can be accessed in their enclosing scope even before they are declared.
          Variables declared with the let keyword are block-scoped, which means the variables will have scope to the immediate enclosing block.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
        <button class="accordion-button collapsed fw-bold fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
          #2 What are the differences betweem regular and arrow function declaration?
        </button>
      </h2>
      <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
        <div class="accordion-body fw-semibold fs-5">
          In regular function, we have to use return keyword to return any value. If we don’t return anything then the function will return undefined.
          Arrow functions behave in the same way when returning values. If the arrow function contains one expression, we can omit the curly braces, and then the expression will be implicitly returned.
          In regular function, Arguments keywords can be used to access the arguments of which passed to function. Arrow functions do not have an arguments binding.
          Arrow functions don’t have their own <code>this</code>, and they don’t redefine the value of <code>this</code> within the function. <code>this</code> inside an arrow function always refers to this from the outer context.
          Regular functions are constructible, they can be called using the new keyword.
          However, arrow functions can never be used as constructor functions. Hence, they can never be invoked with the new keyword.
          Arrow functions can never have duplicate named parameters, whether in strict or non-strict mode.
          In regular function, function gets hoisting at top. In arrow function, function get hoisted where you define. So, if you call the function before initialisation you will get referenceError.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-headingThree">
        <button class="accordion-button collapsed fw-bold fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
          #3 What are the differences between map(), forEach(), filter() and find()?
        </button>
      </h2>
      <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
        <div class="accordion-body fw-semibold fs-5">
          The <code>map()</code>  method creates a new array populated with the results of calling a provided function on every element in the calling array.
          The <code>forEach()</code>  method executes a provided function once for each array element.
          The <code>filter() </code>method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.
          The <code>find()</code> method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-headingFour">
        <button class="accordion-button collapsed fw-bold fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
          #4 What is the reason for using template strings?
        </button>
      </h2>
      <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
        <div class="accordion-body fw-semibold fs-5">
          Template strings, better known as Template literals, are literals delimited with backtick characters, allowing for multi-line strings, for string interpolation with embedded expressions, and for special constructs called tagged templates.
          Template literals are sometimes informally called template strings, because they are used most commonly for string interpolation (to create strings by doing substitution of placeholders). 
          However, a tagged template literal may not result in a string; it can be used with a custom tag function to perform whatever operations you want on the different parts of the template literal.
        </div>
      </div>
    </div>
  </div>
    `
    blogContainer.appendChild(blogDiv);

    const totalArticles = document.getElementById('total-articles');
    totalArticles.innerHTML = `
        <p class="fs-3 fw-semibold">You are currently viewing the Blog Section</p>
    `

    toggleSpinner(false);
}

//Default function call to create a homepage
articleSearch('01');