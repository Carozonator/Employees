var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee');

exports.delete = function(req, res, next) {
    Employee.remove({_id: req.body.id},function(err,employees){
        if (err) throw err;
        res.status(200).send("Success");
    });
};

exports.list = function(req, res, next) {
    Employee.find({},function(err,employees){
        if (err) throw err;
        res.status(200).send(employees);
    });
};

exports.add = function(req, res, next) {
    var newEmployee={
        name:req.body.name,
        lastname:req.body.lastname,
        technologies:req.body.technologies
    } 
    //HERE IS THE PROBLEM!! 
    console.log(newEmployee);
    Employee.create(newEmployee,function(err,employees){
        if (err) throw err;
        res.status(200).send("Success");
    });       
};