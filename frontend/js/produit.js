//Mise à jour du basketPreview
basketPreview();

// récupération de l'id du produit
const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get('_id');

//modification de l'adresse d'appel à l'API
const newUrl = `http://localhost:3000/api/cameras/${newId}`;

fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
        const product = data;
        addCard(data);

        // fonction pour la création de la card de la page produit
        function addCard(product) {
            // insertion des information de la card du produit
            const selectionProductImage = document.getElementById('productImage');
            selectionProductImage.innerHTML += `
        <img src="${product.imageUrl}" class="img-fluid img-thumbnail" alt="${product.name}">
        `;
            const selectionProductName = document.getElementById('productName');
            selectionProductName.innerHTML += `
        <h5 class="card-title">${product.name}</h5>
        `;
            const selectionProductPrice = document.getElementById('productPrice');
            selectionProductPrice.innerHTML += `
         <h5 class="card-title">${convertPrice(product.price)}</h5>
        `;
            const selectionProductDescription =
                document.getElementById('productDescription');
            selectionProductDescription.innerHTML += `
        <p class="card-text">${product.description}</p>
        `;
            addLenses(product);
        }

        function addLenses(product) {
            const versionChoice = document.getElementById('option');
            for (let lenses of product.lenses) {
                versionChoice.innerHTML += `<option value="${lenses}">${lenses}</option>`;
            }
        }

        const btnAddBasket = document.getElementById('btnAddBasket');
        btnAddBasket.addEventListener('click', (e) => {
            e.preventDefault();
            const list = document.getElementById('option');
            const quantity = document.getElementById('quantity');

            // création de la fiche produit sélectionner
            let objectProduct = new Product(
                newId,
                product.name,
                product.description,
                product.price,
                list.value,
                quantity.value,
                product.imageUrl
            );
            // vérifie s'il est déja présent
            // si oui, dejaPresent en true et sauvegarde sa place dans le localStorage
            let isAlreadyPresent = false;
            let indexModification;
            for (products of basket) {
                switch (products.option) {
                    case objectProduct.option:
                        isAlreadyPresent = true;
                        indexModification = basket.indexOf(products);
                }
            }

            // si déjaPresent incrémente seulement la quantité
            if (isAlreadyPresent) {
                basket[indexModification].quantity = +basket[indexModification].quantity + +objectProduct.quantity;
                localStorage.setItem('cameras', JSON.stringify(basket));
                // si non, ajoute le produit au localStorage
            } else {
                basket.push(objectProduct);
                localStorage.setItem('cameras', JSON.stringify(basket));
            }
        });
    });