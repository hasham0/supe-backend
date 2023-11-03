import jwt from "jsonwebtoken";
import "dotenv";

// checking authentication
export const isAuthentication = async (request, response, next) => {
  if (!request.cookies.hasOwnProperty("auth_Token")) {
    next(new Error("please login to acces this resource"));
    return;
  }

  const userToken = request.cookies.auth_Token;
  const decode = jwt.verify(userToken, process.env.SECRATE_KEY);
  request.user = decode.foundUser;
  next();
};

// checking role of authorize user
export const isAuthRole = (...roles) => {
  return (request, response, next) => {
    if (!roles.includes(request.user.role)) {
      next(new Error("unauthorize user"));
    }
    next();
  };
};
