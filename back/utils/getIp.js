//GETS THE IP OF THE USER REQUEST
module.exports = (req) => {
  let ipAddress
  // The request may be forwarded from local web server.
  const forwardedIpsStr = req.header("x-forwarded-for")
  if (forwardedIpsStr) {
    const forwardedIps = forwardedIpsStr.split(",")
    ipAddress = forwardedIps[0]
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress
  }
  return ipAddress
}
