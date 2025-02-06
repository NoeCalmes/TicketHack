fetch('http://localhost:5000/bookings/booked')
    .then(response => response.json())
    .then(bookings => {
        const bookingContainer = document.getElementById('booking-container');
        bookingContainer.innerHTML = '';

        if (bookings.length === 0) {
            document.querySelector("body > h3").innerHTML=""
            const emptyMessage = document.createElement('div');
            emptyMessage.style.background = 'lightgray';
            emptyMessage.style.borderRadius = '6px';
            emptyMessage.style.height = '20vh';
            emptyMessage.style.width = '60vh';
            emptyMessage.style.display = 'flex';
            emptyMessage.style.flexDirection = 'column';
            emptyMessage.style.justifyContent = 'center';
            emptyMessage.style.alignItems = 'center';
            emptyMessage.innerHTML = '<p>Aucune réservation pour le moment.</p><p>Pourquoi ne pas planifier un voyage ?</p>';
            bookingContainer.appendChild(emptyMessage);
        } else {
            bookings.forEach(booking => {
                booking.trips.forEach(trip => {
                    const tripElement = document.createElement('div');
                    const tripInfo = document.createElement('p');
                    const countdownElement = document.createElement('p');

                    tripInfo.textContent = `${trip.departure} vers ${trip.arrival} le ${new Date(trip.date).toLocaleDateString()} - ${trip.price}€`;
                    tripElement.appendChild(tripInfo);
                    tripElement.appendChild(countdownElement);
                    bookingContainer.appendChild(tripElement);

                    const updateCountdown = () => {
                        const now = new Date();
                        const departureDate = new Date(trip.date);
                        const timeDifference = departureDate - now;

                        if (timeDifference > 0) {
                            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                            countdownElement.textContent = `Temps restant avant le départ : ${days}j ${hours}h ${minutes}m ${seconds}s 🕰️`;
                        } else {
                            countdownElement.textContent = 'Le voyage a déjà commencé ou est terminé. 🏁';
                        }
                    };

                    updateCountdown();
                    setInterval(updateCountdown, 1000);
                });
            });
        }
    })
    .catch(error => console.error('Erreur lors de la récupération des réservations :', error));
