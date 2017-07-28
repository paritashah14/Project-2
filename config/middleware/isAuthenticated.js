// This is middleware for restrictng routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    res.send(JSON.stringify({
      valid: true
    }));
    return next();
  }
  res.send(JSON.stringify({
    valid: false
  }));
  // If the user isnt' logged in, redirect them to the login page
  return req.redirect('/');
};
