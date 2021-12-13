const pug = require("pug");

const renderPug = (template, data) => {
    return pug.compileFile(template)(data);
};

module.exports = renderPug;