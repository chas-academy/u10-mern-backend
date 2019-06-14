const router = require('express').Router();

router.get(
  '/user',
  (req, res) => {
    if (req.isAuthenticated()) {
      const { name, email } = req.user.google;
      const { subscription } = req.user;
      return res.json({
        user: {
          name,
          email,
          subscription,
        },
      });
    }
    return res.status(401).send('Not authenticated!');
  },
);

module.exports = router;
