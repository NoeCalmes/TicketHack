document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const departure = document.getElementById('departure').value;
        const arrival = document.getElementById('arrival').value;
        const date = document.getElementById('date').value;
    
        const errorMessage = document.getElementById('error-message'); 
        
        if (!departure || !arrival || !date) {
            errorMessage.textContent = 'Veuillez remplir tous les champs';
            errorMessage.style.display = 'block'; // 🔹 Affiche le message d'erreur
            return;
        } else {
            errorMessage.style.display = 'none'; // 🔹 Cache le message si tout est bon
        }
    
        const resultContainer = document.getElementById('result');
        

        try {

            let targetDate = new Date(date); 
            console.log(targetDate);
            const response = await fetch(`http://localhost:5000/api/rech?departure=${departure}&arrival=${arrival}&date=${targetDate}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
            }
            const trips = await response.json();
    
            resultContainer.innerHTML = ''; 
    
            if (trips.length === 0) {
                resultContainer.innerHTML = "<img src='./images/notfound.png' style='padding: 20px;align-items: center;  justify-content: center;'><br><p>Aucun voyage trouvé</<p>";
                return;
            }

    
            trips.forEach(trip => {

                const tripElement = document.createElement('div');
                tripElement.classList.add('trip');
                tripElement.innerHTML = `
                    <h3>${trip.departure} ➔ ${trip.arrival}</h3>
                    <p>Date : ${new Date(trip.date).toLocaleDateString()}</p>
                    <p class="price">Prix : ${trip.price} €</p>
                   <button class="book-btn" data-trip-id="${trip._id}">Book</button>
                `;

                tripElement.querySelector('.book-btn').addEventListener('click', function() {
                    addToCart(trip._id);  
                });
                
                
                resultContainer.appendChild(tripElement);
               
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des trajets :', error);
            resultContainer.innerHTML = '<p>Une erreur est survenue lors de la récupération des trajets. ( Le back est peut être pas démarré )</p>';
        }
    });
    

    function addToCart(tripId) {
        fetch('http://localhost:5000/apicart/cart/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tripIds: [tripId] })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Trip added to cart:', data);
            window.location.href = "./cart.html";
        })
        .catch(error => console.error('Error:', error));
    }
    
    




