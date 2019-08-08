const cors = {
  trustyOrigin: [
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:8082"
  ],
  isTrustyOrigin: function(origin) {
    let that = this;
    if (that.trustyOrigin.indexOf(origin) > -1) {
      return true;
    }
  }
};

module.exports = cors;
