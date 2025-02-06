function displayCart() {
    fetch('http://localhost:5000/apicart/cart')
        .then(response => response.json())
        .then(data => {
            const cartContainer = document.getElementById('cart-container');
            cartContainer.innerHTML = '';
            let total = 0;
            
            data.trips.forEach(trip => {
                const tripWrapper = document.createElement('div');
                tripWrapper.classList.add('trip-item');

                const tripElement = document.createElement('p');
                tripElement.textContent = `${trip.departure} vers ${trip.arrival} le ${new Date(trip.date).toLocaleDateString()} - ${trip.price}€`;

                const button = document.createElement('button');
                button.textContent = 'Supprimer';
                button.classList.add('delete-btn');
                button.addEventListener('click', () => removeFromCart(trip._id));

                tripWrapper.appendChild(tripElement);
                tripWrapper.appendChild(button);
                cartContainer.appendChild(tripWrapper);

                total += trip.price;
            });

            const totalElement = document.getElementById('panier-total');
            totalElement.innerHTML = `<p>Total : ${total} €</p>`;

            if (!data.trips || data.trips.length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'Votre panier est vide.';
                cartContainer.appendChild(emptyMessage);
                totalElement.innerHTML = '<p>Total : 0 €</p>';
                document.querySelector("body > div > div").innerHTML ="<div style='background: lightgray; border-radius: 6PX; HEIGHT: 20VH; WIDTH: 60VH; align-content: center; text-align: center; '> <p>No booking yet.</p> <p>Why not plan trip?</p></div>"
            }
        })
        .catch(error => console.error('Erreur:', error));
}

function removeFromCart(tripId) {
    fetch(`http://localhost:5000/apicart/cart/remove/${tripId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du voyage du panier');
        }
        return response.json();
    })
    .then(() => displayCart())
    .catch(error => console.error('Erreur:', error));
}


document.getElementById('purchase-btn').addEventListener('click', () => {
    fetch('http://localhost:5000/apicart/cart')
        .then(response => response.json())
        .then(cartData => {
            const tripIds = cartData.trips.map(trip => trip._id);
            fetch('http://localhost:5000/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trips: tripIds })
            })
            .then(response => response.json())
            .then(() => {
                fetch('http://localhost:5000/apicart/clear', { method: 'DELETE' })
                    .then(() => {
                        window.location.href = './booking.html';
                    })
                    .catch(error => console.error('Error clearing cart:', error));
            })
            .catch(error => console.error('Error creating booking:', error));
        })
        .catch(error => console.error('Error fetching cart:', error));
});


document.addEventListener('DOMContentLoaded', displayCart);


