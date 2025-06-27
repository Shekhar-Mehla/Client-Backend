export const responseClient = ({
  req,
  res,
  message,
  statusCode = 200,
  payload,
}) => {
  console.log("hello response handler");
  //Success response
  req.success = () => {
    return res.status(statusCode).json({
      status: "success",
      message,
      payload,
    });
  };
  //Error response
  req.error = () => {
    return res.status(statusCode).json({
      status: "error",
      message,
    });
  };
  if (statusCode >= 200 && statusCode < 300) {
    return req.success();
  } else {
    return req.error();
  }
};
