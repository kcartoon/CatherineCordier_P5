//Mise à jour du basketPreview du header
basketPreview();

const orderForm = document.getElementById('orderForm');
const emptyBasket = document.getElementById('emptyBasket');

// indique que le panier est vide
if (basket.length < 1) {
    orderForm.classList.add('d-none');
    // sinon affiche le tableau avec les produits
} else {
    orderForm.classList.add('d-none');
    emptyBasket.classList.add('d-none');
    const fullBasket = document.getElementById('basket');
    fullBasket.classList.toggle('d-none');
    for (product of basket) {
        displayProductListTable(product);
    }

    // ajouter produit
    function addProduct(event) {
        const index = event.target.getAttribute('data-index');
        basket[index].quantity++;
        localStorage.setItem('cameras', JSON.stringify(basket));
        location.reload();
    }

    const buttonAdd = document.getElementsByClassName('plus');
    for (add of buttonAdd) {
        add.addEventListener('click', addProduct);
    }

    //supprimer un produit
    function minusProduct(event) {
        const index = event.target.getAttribute('data-index');
        if (basket[index].quantity > 1) {
            basket[index].quantity--;
        } else {
            basket.splice(index, 1);
        }
        localStorage.setItem('cameras', JSON.stringify(basket));
        location.reload();
    }

    const buttonMinus = document.getElementsByClassName('minus');
    for (minus of buttonMinus) {
        minus.addEventListener('click', minusProduct);
    }

    //affiche le prix total
    totalPrice();

    //affiche le formulaire et cache les boutons valider/supprimer panier
    const validationBasket = document.getElementById('validationBasket');
    const cacheButton = document.getElementById('cacheButton');
    validationBasket.addEventListener('click', () => {
        orderForm.classList.toggle('d-none');
        cacheButton.classList.add('d-none');
    });

    //vide le panier
    const buttonClearBASKET = document.getElementById('clearBasket');
    buttonClearBASKET.addEventListener('click', () => {
        clearBasket();
        location.reload();
    });

    //validation du formulaire et envoie en POST
    const order = document.getElementById('order');
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity =
        /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
    const checkBox = document.getElementById('invalidCheck2');

    order.addEventListener('click', (event) => {
        // on prépare les infos pour l'envoie en POST
        let contact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value,
        };
        // on valide que le formulaire si il est correctement rempli
        if (
            (regexMail.test(contact.email) == true) &
            (regexName.test(contact.firstName) == true) &
            (regexName.test(contact.lastName) == true) &
            (regexCity.test(contact.city) == true) &
            (regexAddress.test(contact.address) == true) &
            (checkBox.checked == true)
        ) {
            event.preventDefault();

            // on stocke l'heure et la date de la commande
            const todayDate = new Date();
            let nowadays = todayDate.getDate();
            let month = todayDate.getMonth() + 1;
            let todayHours = todayDate.getHours();
            let todayMinutes = todayDate.getMinutes();

            if (nowadays < 10) {
                nowadays = '0' + nowadays;
            }

            if (month < 10) {
                month = '0' + month;
            }

            if (todayHours < 10) {
                todayHours = '0' + todayHours;
            }

            if (todayMinutes < 10) {
                todayMinutes = '0' + todayMinutes;
            }

            const date = nowadays + '-' + month + '-' + todayDate.getFullYear();
            const hours = todayHours + ':' + todayMinutes;
            const fullDate = { date, hours };
            const infoOrder = JSON.parse(localStorage.getItem('date')) || [];
            infoOrder.push(fullDate);
            localStorage.setItem('date', JSON.stringify(infoOrder));

            let products = [];
            for (listId of basket) {
                products.push(listId.id);
            }

            // on envoie en POST
            fetch('http://localhost:3000/api/cameras/order/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ contact, products }),
                })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem('order', JSON.stringify(data));
                    document.location.href = 'order.html';
                })
                .catch((erreur) => console.log('erreur : ' + erreur));
        } else {
            alert(
                'Veuillez correctement renseigner correctement le formulaire pour valider votre commande.'
            );
        }
    });
}