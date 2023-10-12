const categoryReducer = (state = 10, action) => {
  switch (action.type) {
    case "NEW":
      return (state = 10);
    case "MUSIC":
      return (state = 20);
    case "GAME":
      return (state = 30);
    case "MOVIE":
      return (state = 24);
  }
};
