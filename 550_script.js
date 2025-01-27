document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://376009-27.web.fhgr.ch/550_unload.php'; // Passen Sie die URL bei Bedarf an

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('temperatureChart').getContext('2d');
            const datasets = Object.keys(data).map(city => ({
                label: city,
                data: data[city].map(item => item.temperature_celsius),
                fill: false,
                borderColor: getRandomColor(), // Generiert eine zufällige Farbe für jede Stadtlinie im Diagramm
                tension: 0.1 // Gibt der Linie im Diagramm eine leichte Kurve
            }));

            new Chart(ctx, {
                type: 'line',
                data: { 
                    labels: data['Bern'].map(item => new Date(item.created_at).toLocaleDateString()), // Nimmt an, dass alle Städte Daten für dieselben Daten haben
                    datasets: datasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false // Startet die y-Achse nicht bei 0, um einen besseren Überblick über die Schwankungen zu geben
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Fetch-Fehler:', error)); // Gibt Fehler im Konsolenlog aus, falls die Daten nicht abgerufen werden können

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color; // Erzeugt eine zufällige Farbe
    }
});