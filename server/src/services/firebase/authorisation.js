const admin = require('firebase-admin');

async function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Unauthorized', 
                message: 'No token provided' 
            });
        }

        const token = authHeader.split('Bearer ')[1];
        
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        // Attach user info to request
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            emailVerified: decodedToken.email_verified
        };
        
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).json({ 
            error: 'Forbidden', 
            message: 'Invalid or expired token' 
        });
    }
}

// Middleware to check if the authenticated user matches the userId parameter
function verifyUserOwnership(req, res, next) {
    const { userId } = req.params;
    
    if (req.user.uid !== userId) {
        return res.status(403).json({ 
            error: 'Forbidden', 
            message: 'You do not have permission to access this resource' 
        });
    }
    
    next();
}

module.exports = { verifyToken, verifyUserOwnership };