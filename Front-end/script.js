document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const departure = document.getElementById('departure').value;
        const arrival = document.getElementById('arrival').value;
        const date = document.getElementById('date').value;
    
        const resultContainer = document.getElementById('result');

        if (!departure || !arrival || !date) {
            resultContainer.innerHTML = '<p>Veuillez remplir tous les champs</p>';
            return;
        }

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
                    <p>Prix : ${trip.price} €</p>
                `;
                resultContainer.appendChild(tripElement);
               
                
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des trajets :', error);
            resultContainer.innerHTML = '<p>Une erreur est survenue lors de la récupération des trajets. ( Le back est peut être pas démarré )</p>';
        }
    });
    
