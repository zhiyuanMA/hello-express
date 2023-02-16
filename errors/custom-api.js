class CustomAPIErr extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomAPIErr;