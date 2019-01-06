var express = require('express');
var router = express.Router();
var mymongo1610 = require('mymongo1610');

/* 查询用户信息 */
router.get('/userlist', function(req, res, next) {
    mymongo1610.find("names", function(err, result) { //查找
        if (err) {
            res.json({
                code: 0,
                msg: "error"
            })
        } else {
            res.json({ code: 1, data: result });
        }
    })
});

/*删除用户信息 */
router.get("/remove", function(req, res, next) { //删除
    var _id = req.query.id;
    if (_id) {
        mymongo1610.delete("names", { _id: _id }, function(err) {
            if (err) {
                res.json({
                    code: 0,
                    msg: "error"
                })
            } else {
                res.json({
                    code: 1,
                    msg: "删除成功"
                })
            }
        })
    }
})

//查看详情
router.get("/search", function(req, res) {
    var _id = req.query.id;
    mymongo1610.find("names", { _id: _id }, function(err, result) { //查找
        if (err) {
            res.json({
                code: 0,
                msg: "error"
            })
        } else {
            res.json({ code: 1, data: result });
        }
    })
})

//添加用户信息
router.post("/add", function(req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var sex = req.body.sex;
    var address = req.body.address;
    mymongo1610.insert("names", { name: name, age: age, sex: sex, address: address }, function(err, result) { //查找
        if (err) {
            res.json({
                code: 0,
                msg: "error"
            })
        } else {
            res.json({ code: 1, data: result });
        }
    })
})





module.exports = router;