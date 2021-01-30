// crate and send token and save in cookie

const sendToken = (user, statusCode, res) => {
  //get/create token
  const token = user.getJwtToken()

  // option for cookie
  const options = {
    expires: new Date(
      Date.now + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  })
}

module.exports = sendToken
