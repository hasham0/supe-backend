export const errorsMid = (err, request, responce, next) => {
  let copyErr = Object.assign({}, err);
  copyErr.message = err.message;

  //note: validation handler
  if (err.name === "ValidationError") {
    const mess = Object.values(err.errors).map((item) => item.message);
    copyErr = new Error(mess);
  }

  //note: duplicate value handler
  if (err.code === 11000) {
    const dupVal = `Duplicate:${Object.keys(err.keyValue)}`;
    copyErr = new Error(dupVal);
  }

  //note: cast error handler
  if (err.name === "CastError") {
    const mess = `Reseource not found :invalid ${err.path}`;
    copyErr = new Error(mess);
  }

  responce.json({
    err: copyErr.message,
  });
};
