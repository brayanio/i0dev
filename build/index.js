/* SERVER */
const server = require('./server/util/server.js')
require('./server/service/test.js');
require('./server/route/test.js');
server.serve(4200)
console.clear()