var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    name:String,
    lastname:String,
    technologies: [{
        technology:String,
        status:Boolean
    }]
});

module.exports = mongoose.model('Employee', EmployeeSchema);