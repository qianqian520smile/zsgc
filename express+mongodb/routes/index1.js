var express = require('express');
var router = express.Router();
var connect = require('../mongoDB');
/* GET home page. */
router.get('/', function(req, res, next) {
    connect(function(err, collection) {
        if (err) {
            err
        } else {
            collection.find().toArray(function(err, result) {
                if (err) {
                    res.render({ code: 0, msg: 'error' });
                } else {
                    res.render('index', { data: result })
                }
            })
        }
    })
});
// 添加/修改请求的页面
router.get('/add', function(req, res, next) {
    res.render('add');
});
// 修改
router.get('/updata', function(req, res, next) {
    // console.log(req.query)
    connect(function(err, collection) {
        if (err) {
            err
        } else {
            collection.updateOne({ 'name': req.query.oldUser, 'pwd': req.query.oldPwd }, { $set: { 'name': req.query.name, 'pwd': req.query.pwd } }, function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: '修改失败' });
                } else {
                    res.json({ code: 1, msg: '修改成功' });
                }
            })
        }
    })

});
// 添加
router.get('/addData', function(req, res, next) {
    console.log(req.query);
    connect(function(err, collection) {
        if (err) {
            err
        } else {
            collection.insertOne({ 'name': req.query.name, 'pwd': req.query.pwd }, function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: '添加失败' });
                } else {
                    res.json({ code: 1, msg: '添加成功' });
                }
            });
        }
    })
});
// 删除
router.get('/del', function(req, res, next) {
    // console.log(req.query)
    connect(function(err, collection) {
        if (err) {
            err
        } else {
            collection.deleteOne({ 'name': req.query.name, 'pwd': req.query.pwd }, function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: '删除失败' });
                } else {
                    res.json({ code: 1, msg: '删除成功' });
                }
            });
        }
    })
});
router.get('/find', function(req, res, next) {
    var reg = new RegExp(req.query.name);
    connect(function(err, collection) {
        if (err) {
            err
        } else {
            collection.find({ "name": { $regex: reg } }).toArray(function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: '查无此人' });
                } else {
                    res.json(result);
                }

            })

        }
    })
});


module.exports = router;