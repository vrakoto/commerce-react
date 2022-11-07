const { sign, verify, decode } = require("jsonwebtoken")

module.exports = {    
    forwardAccessWhileConnected(req, res, next) {
        const accessToken = req.cookies["access-token"]

        if (accessToken) {
            return res.status(403).send("Not allowed while connected")
        }
        return next()
    },

    createTokens(user) {
        const accessToken = sign(
            { username: user.identifiant, mdp: user.mdp },
            "jwtsecretplschange"
        );

        return accessToken
    },

    validateToken(req, res, next) {
        const accessToken = req.cookies["access-token"]
        
        if (!accessToken) {
            return res.status(401).send("Not connected")
        }
    
        try {
            const validToken = verify(accessToken, "jwtsecretplschange")
            if (validToken) {
                res.cookie("access-token", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true
                })
                return next()
            }
            return res.send({ error: "Authentification incorrect" });
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    },

    getAuthenticated(accessToken) {
        const decoded = decode(accessToken, "jwtsecretplschange")
        return decoded.username
    }
}