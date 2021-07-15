const Service = require('../_service.js');
Service.Test.Random = max => Math.floor(Math.random() * max) + 1
Service.Test.Caps = str => str.toUpperCase()