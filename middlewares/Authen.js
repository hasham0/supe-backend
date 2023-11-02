import jwt from "jsonwebtoken";
import "dotenv";

// checking authentication
export const isAuthentication = async (request, response, next) => {
  const userToken = request.cookies.auth_Token;
  if (!userToken) {
    next(new Error("please login to acces this resource"));
  }
  const decode = await jwt.verify(userToken, process.env.SECRATE_KEY);
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
