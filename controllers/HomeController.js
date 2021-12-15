const hello = (req, res) => {
    res.json({
        success: true,
        message: "Hello Delta !!!!!"
    });
};

const joke = (req, res) => {
    res.json({
        success: true,
        message: "Tell me a joke"
    });
};

module.exports = {
    hello,
    joke
};