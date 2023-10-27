export const errorsMid = (error, request, responce, next) => {
  let copyErr = Object.assign({}, error);
  copyErr.message = error.message;

  //note: validation handler
  if (error.name === "ValidationError") {
    const mess = Object.values(error.errors).map((item) => item.message);
    copyErr = new Error(mess);
  }

  //note: duplicate value handler
  if (error.code === 11000) {
    const dupVal = `Duplicate:${Object.keys(error.keyValue)}`;
    copyErr = new Error(dupVal);
  }

  //note: cast error handler
  if (error.name === "CastError") {
    const mess = `Reseource not found :invalid ${error.path}`;
    copyErr = new Error(mess);
  }

  responce.json({
    error: copyErr.message,
  });
};
