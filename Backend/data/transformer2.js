const fs = require('fs');
const path = require('path');

// Read the GeoJSON file
const geojsonFilePath = path.join(__dirname, 'original.geojson');
const geojsonData = JSON.parse(fs.readFileSync(geojsonFilePath, 'utf8'));

// Extract country names
const countries = geojsonData.features.map(feature => feature.properties.name);

// Function to get a random number based on specified probabilities
function getRandomNumber() {
  const rand = Math.random();
  if (rand < 0.12) return 4; // 12% probability
  if (rand < 0.40) return 2; // 28% probability
  if (rand < 0.55) return 3; // 15% probability
  if (rand < 0.80) return 1; // 25% probability
  return 0; // 20% probability
}

// Assign a random number to each country
const countriesWithNumbers = countries.map(country => ({
  name: country,
  number: getRandomNumber()
}));

// Save the result to a new JSON file
const countriesFilePath = path.join(__dirname, 'list.json');
fs.writeFileSync(countriesFilePath, JSON.stringify(countriesWithNumbers, null, 2));

console.log('Country names with numbers have been extracted and saved to list.json');