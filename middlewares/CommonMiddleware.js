const checkUserAgent = (req, res, next) => {
    const ua = req.get('User-Agent');
    
    if (ua.includes("Chrome")) {
        next();
    } else {
        res.json({
            success: false,
            message: "Access denied."
        });
    }
};

module.exports = {
    checkUserAgent
};