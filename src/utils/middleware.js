
// Authentication check
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Not authenticated');
};

// Admin authorization check
const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }
  return res.status(403).send('You do not have the required permissions');
};

// User subscription check
const isSubscribed = (req, res, next) => {
  if (req.user.subscription.active || req.user.role === 'admin') {
    return next();
  }
  return res.status(403).send('You do not have the required permissions');
};

module.exports = { isAuthenticated, isAdmin, isSubscribed };
