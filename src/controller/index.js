const moviesData = require("../moviesData");
const registeredUser = require("../usersData");

const getFilteredMovies = (req, res) => {
  const { movieName, movieYear } = req.body;

  if (!movieName && !movieYear) {
    return res.status(400).send({ Error: "Invalid / No criteria is given" });
  }

  const filteredData = moviesData.filter((movie) => {
    if (movieName && movieYear) {
      return (
        movie.title.includes(movieName) &&
        movie.release_date.includes(movieYear)
      );
    } else if (movieName) {
      return movie.title.includes(movieName);
    } else if (movieYear) {
      return movie.release_date.includes(movieYear);
    }
  });

  if (filteredData.length === 0) {
    return res.status(404).send({ Message: "No movies found" });
  }
  return res.status(200).send({ filteredData });
};

const getTop5Rated = (req, res) => {
  moviesData.sort((a, b) => b.vote_average - a.vote_average);
  const topFive = moviesData.slice(0, 5);
  res.status(200).send({ topFive });
};

const getUserTop5 = (req, res) => {
  const { user } = req.body;

  console.log(user);
  if (!user) {
    return res.status(400).send({ Error: "Invalid / No user is given" });
  }

  const selectedUser = registeredUser.find((x) => x.userId === user);
  if (!selectedUser) {
    return res.status(404).send({ Message: "User not found" });
  } else {
    const sortedUserRatings = Object.entries(selectedUser.movieRate).sort(
      (a, b) => b[1] - a[1]
    );

    let result = [];
    sortedUserRatings.forEach((movie) => {
      result.push(moviesData.find((x) => x.title === movie[0]));
    });

    return res.status(200).send(result);
  }
};

const updateRatings = (req, res) => {
  const { movieName, rating, user } = req.body;

  const selectedUser = registeredUser.find((x) => x.userId === user);
  if (!selectedUser) {
    return res.status(404).send({ Message: "User not found" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).send({
      Message: "Rating is an invalid number. Must be betweeen 1 and 5",
    });
  }
  if (Object.keys(selectedUser.movieRate).includes(movieName)) {
    selectedUser.movieRate[movieName] = rating;
    return res.status(200).send({ Message: "Succesfully saved rating" });
  } else {
    selectedUser.movieRate[movieName] = rating;
    return res.status(404).send({ Message: "Succesfully saved rating" });
  }
};

module.exports = {
  getFilteredMovies,
  getTop5Rated,
  getUserTop5,
  updateRatings,
};
