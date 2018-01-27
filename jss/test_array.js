// function fast_power(a, n, mod) {
// 	// body...
// 	var result = 1;
// 	var va = a;
// 	var pow = n;
// 	while (pow > 0) {
// 		if (pow&1 == 1) {
// 			result = (result*va) % mod;
// 		}
// 		pow >>= 1;
// 		va = (va*va) % mod;
// 	}
// 	return result;
// }

// console.log(fast_power(8, 3, 4))

function fast_power(a, n, mod) {
	// body...
	var result = 1;
	var va = a%mod;
	var pow = n;
	while (pow > 0) {
		if (pow&1 == 1) {
			result = (result*va) % mod;
		}
		pow >>= 1;
		va = (va*va) % mod;
	}
	return result;
}

// for (var i = 0; i < 31847; i++) {
// 	// console.log(i);
// 	var remain = fast_power(7, i, 31847);
// 	if (remain == 18074) {
// 		console.log(i);
// 	}
// }


// for (var i = 0; i < 19; i++) {
// 	var z = Math.pow(i, 3) + i + 1;
// 	// var z3 = Math.pow(z, 9) % 19;
// 	var z3 = fast_power(z, 9, 19);
// 	if (z3 == 1) {
// 		var y = fast_power(z, 5, 19);
// 		console.log(i, y, 19-y);
// 	}
// }

// console.log(Math.pow(2,3));

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

var mn = 19;

function get_lamda(x1, y1, x2, y2) {
	// body...
	if (x1!=x2) {
		var inverse = mod_inverse(x2-x1, mn);
		var lamda = (y2 - y1)*inverse;
		lamda = lamda%mn;
		return lamda;
	} else if (x1 == x2 && y1 == y2) {
		// todo:// fix the argument
		var inverse = mod_inverse(2*y1, mn);
		var lamda = (3*x1*x1 + 1)*inverse;
		lamda = lamda%mn;
		return lamda;
	} else {
		console.log("error");
	}
}

function point_add(x1, y1, x2, y2) {
	// body...


}


