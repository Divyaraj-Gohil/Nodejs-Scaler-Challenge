const jwt = require('jsonwebtoken');

const userRoles = {
  regular: 'regular',
  admin: 'admin',
};

const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function authenticateAndAuthorize(req, res, next) {
 
  if (req.get('host') === 'localhost:3000') {
    console.log('Access from localhost:3000 allowed for development.');
  } else {
    return res.status(403).json({ message: 'Access denied. Invalid host.' });
  }
  const sampleUser = {
    id: 'user123',
    username: 'john_doe',
    role: userRoles.regular,
  };

  const sampleAdmin = {
    id: 'admin456',
    username: 'admin_user',
    role: userRoles.admin,
  };

  // Choose the user or admin based on your application logic
  const userToUse = sampleAdmin; // Change this to sampleUser or sampleAdmin as needed

  try {
    // Create a token with user information
    const token = jwt.sign(
      {
        id: userToUse.id,
        username: userToUse.username,
        role: userToUse.role,
      },
      secretKey,
      { expiresIn: '1h' } // Token expires in 1 hour, adjust as needed
    );

    // Attach the token to the response or request for further use if needed
    res.locals.token = token;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token creation errors
    return res.status(500).json({ message: 'Token generation failed.' });
  }
}

module.exports = authenticateAndAuthorize;