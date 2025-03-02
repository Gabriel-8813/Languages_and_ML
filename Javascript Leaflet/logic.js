// Initialize Leaflet map
var map = L.map('map').setView([20, 0], 2); // Centered on the world

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

console.log("Loading CSV file...");

// Function to determine color based on degree of endangerment
function getColor(degree) {
    return degree.includes("Vulnerable") ? "green" :
           degree.includes("Definitely endangered") ? "#FFD700" :
           degree.includes("Severely endangered") ? "orange" :
           degree.includes("Critically endangered") ? "red" :
           degree.includes("Extinct") ? "black" :
           "green"; // Default for unknown categories
}

// Load CSV file using PapaParse
Papa.parse("endangered_languages.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        console.log("CSV Loaded. Column Names:", results.meta.fields);
        console.log("First Row:", results.data[0]); // Print first row to check data

        results.data.forEach(row => {
            if (row.Latitude && row.Longitude) {
                var lat = parseFloat(row.Latitude);
                var lon = parseFloat(row.Longitude);
                var numSpeakers = parseFloat(row["Number of speakers"]) || 0;

                if (!isNaN(lat) && !isNaN(lon)) {
                    var marker = L.circleMarker([lat, lon], {
                        radius: Math.log10(numSpeakers + 1) * 2, // Adjust size for visibility
                        color: getColor(row["Degree of endangerment"]),
                        fillColor: getColor(row["Degree of endangerment"]),
                        fillOpacity: 0.8
                    }).addTo(map);

                    // Popup with language info on hover
                    marker.bindPopup(`
                        <b>${row["Name in English"]}</b><br>
                        <b>Degree of Endangerment:</b> ${row["Degree of endangerment"]}<br>
                        <b>Speakers:</b> ${row["Number of speakers"]}<br>
                        <b>Countries:</b> ${row["Countries"]}
                    `);
                } else {
                    console.warn("Invalid coordinates for:", row);
                }
            }
        });
    }
});