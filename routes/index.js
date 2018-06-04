var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysqlUtil = require('../mysql/dbUtil.js');

/* GET home page. */
router.get('/', function(req, res, next) {

    // query('select * from student').then((results)=>{
    //     res.render('index', {title: 'Express',
    //         users:results
    //     });
    // })
    // mysqlUtil.query('select * from student').then((results)=> {
    //     console.log(results);
    //     res.render('index', {
    //         title: 'Express',
    //         users: results
    //     });
    // });
    // mysqlUtil.update('update student set name="Jerry" where id = ?',[1]);

    mysqlUtil.insert('insert into student(age,name)',[[12,'Tome']]).then((results)=>{
        console.log(results);
    });
    mysqlUtil.queryStat('select * from student where id = ?',[1]).then((results)=> {
        console.log(results);
        res.render('index', {
            title: 'Express',
            users: results
        });
    });

});

module.exports = router
