// Function to create and display the category names as list items
const displayCategories = (categories) =>{
    const categoryList = document.getElementById('category-list');

    for (let i=0; i<8; i++){
        const categoryListItem = document.createElement('li');

        categoryListItem.innerHTML = `
            <li class="nav-item mx-5">
                <button class="btn btn-outline-secondary px-2 my-2 border-0 fs-5 fw-semibold">${categories.news_category[i].category_name}</button>
            </li>
        `;

        categoryList.appendChild(categoryListItem);
    }
}

// API call to get the category details
const loadCategories = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data);
}

// Function call to dynamically load the category names
loadCategories();