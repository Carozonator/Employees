var employees = require('./employees');
module.exports = function (app) {
 app.post('/delete', employees.delete);
 app.post('/add', employees.add);
 app.get('/employees', employees.list);
    
    app.get('/', function (req, res) {
        res.render('index');
    });
};