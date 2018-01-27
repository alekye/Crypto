
// 扩展欧氏算法求模数的逆元
function mod_inverse(num, mn) {
    var ret = new Array();

    // 数据安全检查
    if (num < 1 || mn < 1) {
        var err = {};
        err.msg = "输入数据不能小于 1.";
        ret[0] = err;
        return ret;
    }

    // body...
    var i = 0;
    var r0 = mn;
    var t0 = 0;

    var info = {};
    info.i = i;
    info.rj = r0;
    info.qj = 0;
    info.tj = t0;
    ret[i] = info;

    i += 1;
    var t1 = 1;
    var r1 = num;
    var quotient = Math.floor(r0/r1);
    var remainder = r0%r1;

    info = {};
    info.i = i;
    info.rj = r1;
    info.qj = quotient;
    info.tj = t1;
    ret[i] = info;

    if (remainder == 0) {
        info = {};
        info.msg = "整数倍的乘法逆元不存在！";
        ret[i+1] = info;
    }

    var t2 = 0;
    while (remainder > 0) {
        i += 1;
        r0 = r1;
        r1 = remainder;
        t2 = t0 - quotient*t1;
        quotient = Math.floor(r0/r1);
        remainder = r0%r1;

        info = {};
        info.i = i;
        info.rj = r1;
        info.qj = quotient;
        info.tj = t2;
        ret[i] = info;

        t0 = t1;
        t1 = t2;
    }

    return ret;
}

// 绑定加密按钮事件
document.querySelector('#btn_submit').addEventListener('click', function () {
    var d = document.getElementById('myconsole');

	var str_a = document.querySelector('#input_a').value;
    var str_b = document.querySelector('#input_b').value;

    if (str_a.length > 0 && str_b.length > 0) {
        var num_a = parseInt(str_a);
        var num_b = parseInt(str_b);
        var result = mod_inverse(num_a, num_b);
        var mstr = "";
        for (var i in result) {
            mstr += '<div class="weui-cell"><p>' + JSON.stringify(result[i]) + '</p></div>'; 
        }

        var last = result[result.length-1];
        if (last.msg) {
            // 错误信息
            mstr += '<div class="weui-cell"><p><font color="red">' + last.msg + '</font></p></div>'; 
        } else {
            var reverse = last.tj;
            if (reverse < 0) {
                reverse += num_b;
            }
            mstr += '<div class="weui-cell"><p>逆元: <font color="red">' + reverse + '</font></p></div>'; 
        }

        d.innerHTML = mstr;
    } else {
        d.innerHTML = "请输入正确的数字";
    }
});


// 绑定验证按钮事件
document.querySelector('#btn_verify').addEventListener('click', function () {
    var d = document.getElementById('myconsole');

    var str_x = document.querySelector('#input_x').value;
    var str_y = document.querySelector('#input_y').value;
    var str_z = document.querySelector('#input_z').value;

    if (str_x.length > 0 && str_y.length > 0 && str_z.length > 0) {
        var num_x = parseInt(str_x);
        var num_y = parseInt(str_y);
        var num_z = parseInt(str_z);
        
        var remainder = (num_x * num_y)%num_z;
        var mstr = '<div class="weui-cell"><p><font color="red">余数 = ' + remainder + '</font></p></div>';
        d.innerHTML = mstr;
    } else {
        d.innerHTML = "请输入正确的数字";
    }
});

// 取模运算
document.querySelector('#btn_mod').addEventListener('click', function () {
    // body...
    var d = document.getElementById('myconsole');

    var str_c = document.querySelector('#input_c').value;
    var str_d = document.querySelector('#input_d').value;
    if (str_c.length > 0 && str_d.length > 0) {
        var num_c = parseInt(str_c);
        var num_d = parseInt(str_d);
        var mod = num_c % num_d;
        var mstr = '<div class="weui-cell"><p><font color="red">余数 = ' + mod + '</font></p></div>';
        d.innerHTML = mstr;
    } else {
        d.innerHTML = "请输入正确的数字";
    }
});

// export default mod_inverse;
