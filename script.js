const primaryNav = document.querySelector(".primary-navigation");
const navToggle =  document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
    const visibilty = primaryNav.getAttribute("data-visible");
    
    if(visibilty === "false")
    {
        primaryNav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    }
    else if(visibilty === "true")
    {
        primaryNav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});



function loadProducts() 
            {
                fetch('/products').then(res => res.json()).then(data => {
                    const productsDiv = document.getElementById('products');
                    const productsDropUpdate = document.getElementById('prod-list-update');
                    const productsDropDelete = document.getElementById('prod-list-delete');
                    productsDiv.innerHTML = '';
                    productsDropUpdate.innerHTML = '';
                    productsDropDelete.innerHTML = '';
                    data.forEach(product => {
                        const productDiv = document.createElement('div');
                        const productDropUpdate = document.createElement('option');
                        const productDropDelete = document.createElement('option');
                        productDiv.innerHTML = '<img src=" ' + product.url + ' " style="max-height:200px"> <br>' + product.brand + ' - ' + product.model + ' - ' + product.price + ' - ' + product.category + '- In Stock:' + product.inStock;
                        productsDiv.appendChild(productDiv);
                        productDropUpdate.innerHTML = product.brand + ' - ' + product.model;
                        productDropDelete.innerHTML = product.brand + ' - ' + product.model;
                        productDropUpdate.value = product._id;
                        productDropDelete.value = product._id;
                        productsDropUpdate.appendChild(productDropUpdate);
                        productsDropDelete.appendChild(productDropDelete);
                    });
                });
            }

            

            function listUpdate() 
            {
                const brand = document.getElementById('u_brand');
                const model = document.getElementById('u_model');
                const price = document.getElementById('u_price');
                const category = document.getElementById('u_category');
                const inStock = document.getElementById('u_inStock');
                const url = document.getElementById('u_url');
                const id = document.getElementById('prod-list-update').value;

                fetch(`/products/${id}`).then(res => res.json()).then(data => {
                    console.log();
                    brand.value = data.brand;
                    model.value = data.model;
                    price.value = data.price;
                    category.value = data.category;
                    inStock.checked = data.inStock;
                    url.value = data.url;
                });
            }

            document.getElementById('search-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const searchValue = document.getElementById('search-input').value;
                const searchCatagory = document.getElementById('s_category').value;

                if(searchCatagory == "All")
                {
                    fetch('/products').then(res => res.json()).then(data => {
                        data.forEach(product =>{
                            if(searchValue.includes(product.brand + product.model + product.price + product.category))
                            {
                                const searchResults = document.getElementById('search-results');
                                const searchResult = document.createElement('div');
                                searchResult.innerHTML = '<img src=" ' + product.url + ' " style="max-height:200px"> <br>' + product.brand + ' - ' + product.model + ' - ' + product.price + ' - ' + product.category + '- In Stock:' + product.inStock;
                                searchResults.appendChild(searchResult);
                            }
                        });
                    });
                }

            });
            document.getElementById('update-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const id = document.getElementById('prod-list-update').value;
                const product = {
                    brand: document.getElementById('u_brand').value,
                    model: document.getElementById('u_model').value,
                    price: document.getElementById('u_price').value,
                    category: document.getElementById('u_category').value,
                    inStock: document.getElementById('u_inStock').checked,
                    url: document.getElementById('u_url').value,
                };

                fetch(`/products/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                .then(() => {
                    document.getElementById('update-form').reset();
                });

            });

            document.getElementById('delete-form').addEventListener('submit', function(e) {
                e.preventDefault();

                const id = document.getElementById('prod-list-delete').value;
                
                fetch(`/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                    document.getElementById('delete-form').reset();
                    loadProducts();
                });
            });

            document.getElementById('product-form').addEventListener('submit', function(e) {
                e.preventDefault();

                const product = {
                    brand: document.getElementById('brand').value,
                    model: document.getElementById('model').value,
                    price: document.getElementById('price').value,
                    category: document.getElementById('category').value,
                    inStock: document.getElementById('inStock').checked,
                    url: document.getElementById('url').value,
                };

                fetch('/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                .then(() => {
                    loadProducts();
                    document.getElementById('product-form').reset();
                });
            });
            loadProducts();