const errorMiddleWare = (err, req, res, next) => {
  //console.log("error middleware");
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export default errorMiddleWare;
