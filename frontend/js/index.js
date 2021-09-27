//Appel de l'adresse URL de l'API
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        addCards(data);
    })
    .catch((error) => {
        alert(
            "Attention votre serveur en local Nodejs n'est pas lancé, veuillez contacter l'administrateur du site"
        );
    });
//Mise à jour du basketPreview
basketPreview();

// fonction pour la création des cards de la page d'accueil
function addCards(data) {
    //boucle pour l'affichage de chaque produit
    for (produit of data) {
        //recupère l'élément liste dans le HTML
        const card = document.getElementById('liste');
        //convertit le prix
        const price = convertPrice(produit.price);
        //Structure des cartes produits
        card.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-6 pb-3">
          <div class="card border bg-light shadow p-3 pb-3 bg-body rounded">
              <div class="card-body bg-pink">
                  <div class="row">
                      <a href="./frontend/produit.html?_id=${produit._id}"><img src="${produit.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${produit.name}"></a>
                      <div class="col-6 col-sm-7 mt-3" >
                          <h3 class="card-title">${produit.name}</h3>
                      </div>
                      <div class="col-6 col-sm-5 text-end mt-3">
                          <h4 class="card-title">${price}</h4>
                      </div>
                  </div>
                  <p class="card-text text-truncate">${produit.description}</p>
                  <a href="./frontend/produit.html?_id=${produit._id}" class="btn-sample">Sélectionner</a>
              </div>
          </div>
      </div>`;
    }
}
