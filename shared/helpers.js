const moment = require('moment');
const dump = (msg) => {
    return JSON.stringify(msg, undefined, 2)
};

module.exports = {
    moment,
    dump,
    siteTitle: 'siema eniu'
};