// alert("hello,bienvenu");
document.addEventListener('DOMContentLoaded', function() {
    var selectElement = document.getElementById('monSelect');
    var unitprice = document.getElementById('pr');
    var deValueElement = document.getElementById('de');
    var amountElement = document.getElementById('mon');
    var amountHT = document.getElementById('mont');
    var tv = document.getElementById('tv');
    var reduction = document.getElementById('red');
    var amountTTDOM = document.getElementById('monh'); // Renommez cette variable pour éviter la confusion

    if(selectElement) {
        console.log('select found');
    } else {
        console.log('select not found');
    }
    selectElement.innerHTML = "";

    const selectOptions = [
        { nom: 'SPA08', prix: 500 },
        { nom: 'SAR34', prix: 500 },
        { nom: 'RI768', prix: 350 },
        { nom: 'TO459', prix: 200 },
        { nom: 'HA450', prix: 300 },
        { nom: 'VIA45', prix: 2500 },
    ];

    for (let option of selectOptions) {
        const newOption = new Option(option.nom, option.prix.toString());
        selectElement.appendChild(newOption);
    }

    selectElement.addEventListener('change', updateFields);
    deValueElement.addEventListener('input', updateFields);

    // Ajout d'un écouteur d'événements pour les radios
    document.querySelectorAll('input[name="radiobtn"]').forEach(radio => {
        radio.addEventListener('change', updateFields);
    });

    // Fonction pour mettre à jour les champs en fonction de la sélection
    function updateFields() {
        var selectedOption = selectElement.options[selectElement.selectedIndex];
        var selectedPrice = parseFloat(selectedOption.value);
        console.log('Prix de l\'option sélectionnée:', selectedPrice);
        unitprice.value = selectedPrice;

        var deValue = parseFloat(deValueElement.value);
        var calculatedValue = selectedPrice * deValue;
        amountElement.value = calculatedValue.toFixed(2);

        // Calcul du Montant HT
        var amountHTCalculated = selectedPrice * deValue;
        amountHT.value = amountHTCalculated.toFixed(2);

        
        var tvaRate = 0.1925; // 19.25%
        var tvaAmount = amountHTCalculated * tvaRate;
        tv.value = tvaAmount.toFixed(2);

        // Calcul de la Réduction
        var radioSelected = document.querySelector('input[name="radiobtn"]:checked');
        var reductionPercentage = 0;
        switch (radioSelected.id) {
            case 'logiciel':
                reductionPercentage = 2 / 100;
                break;
            case 'web':
                reductionPercentage = 5 / 100;
                break;
            default:
                reductionPercentage = 10 / 100;
        }
        var reductionAmount = amountHTCalculated * reductionPercentage;
        reduction.value = reductionAmount.toFixed(2);

        // Calcul du Montant TTC
        var amountTTCalculated = amountHTCalculated + tvaAmount - reductionAmount;
        amountTTDOM.value = amountTTCalculated.toFixed(2); // Utilisez la variable renommée ici
    }
});
var produits = [];

// Fonction pour gérer les mises à jour des détails du produit
function majProduitDetails() {
    // Récupération des valeurs des éléments HTML
    var selectElement = document.getElementById('monSelect');
    var selectedOption = selectElement.options[selectElement.selectedIndex].value;
    var unitprice = document.getElementById('pr').value;
    var deValueElement = document.getElementById('de').value;
    var montantElement = document.getElementById('mon').value;
    var quantiteHT = document.getElementById('mont').value;
    var tv = document.getElementById('tv').value;
    var reduction = document.getElementById('red').value;
    var amountTTDOM = document.getElementById('monh').value;

    // Création d'un nouvel objet pour chaque mise à jour
    var nouveauProduit = {
        newid: produits.length+1,
        nom: selectedOption,
        prixUnitaire: unitprice,
        valeurDeReduction: deValueElement,
        montantHT: montantElement,
        montantQuantiteHT: quantiteHT,
        montantTV: tv,
        montantTTC: amountTTDOM,
        reductionAmount:reduction,
    };

    // Ajout de l'objet au tableau
    produits.push(nouveauProduit);

    // Log pour vérification
    console.log(produits);
}


   



 


    
    

