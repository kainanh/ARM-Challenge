const { Router } = require("express");
const {
  getFilteredMovies,
  getTop5Rated,
  getUserTop5,
  updateRatings,
} = require("../controller");
const router = Router();

router.post("/movies", getFilteredMovies);
router.get("/movies/top5", getTop5Rated);
router.post("/ratings/", getUserTop5);
router.post("/update-ratings", updateRatings);

module.exports = router;
