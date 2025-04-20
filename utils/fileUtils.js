const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File paths for different data types
const FILES = {
  books: path.join(DATA_DIR, "books.json"),
  users: path.join(DATA_DIR, "users.json"),
  reviews: path.join(DATA_DIR, "reviews.json"),
};

// Initialize files if they don't exist
Object.entries(FILES).forEach(([key, filePath]) => {
  if (!fs.existsSync(filePath)) {
    const initialData =
      key === "books" ? require("../constants/initialBooks") : [];
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
  }
});

/**
 * Read data from a JSON file
 * @param {string} type - Data type ('books', 'users', or 'reviews')
 * @returns {Array} Array of objects
 */
function readData(type) {
  try {
    const data = fs.readFileSync(FILES[type], "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${type} data:`, error);
    return [];
  }
}

/**
 * Write data to a JSON file
 * @param {string} type - Data type ('books', 'users', or 'reviews')
 * @param {Array} data - Array of objects to save
 * @returns {boolean} Success status
 */
function writeData(type, data) {
  try {
    fs.writeFileSync(FILES[type], JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${type} data:`, error);
    return false;
  }
}

module.exports = {
  readData,
  writeData,
};
