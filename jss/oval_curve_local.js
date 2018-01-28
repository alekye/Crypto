// 快速幂
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

function mod_inverse_num(num, mod) {
	// body...
	var result = mod_inverse(num, mod);
	var last = result[result.length-1];
    if (last.msg) {
        // 错误信息
        // mstr += '<div class="weui-cell"><p><font color="red">' + last.msg + '</font></p></div>'; 
        return -1;
	} else {
        var inverse = last.tj;
        if (inverse < 0) {
            inverse += mod;
        }
        // mstr += '<div class="weui-cell"><p>逆元: <font color="red">' + inverse + '</font></p></div>'; 
        return inverse;
    }
}

function get_lamda(pt1, pt2, a, p) {
	// body...
	// console.log(pt1, pt2);
	if (pt1.x!=pt2.x) {
		var dfx = pt2.x-pt1.x;
		while(dfx < 0) {
			dfx += p;
			dfx = dfx % p;
		}

		var inverse = mod_inverse_num(dfx, p);
		if (inverse < 0) {
			inverse += p;
        }
		// console.log("inverse = " + inverse);
		var lamda = (pt2.y - pt1.y)*inverse;
		lamda = lamda%p;
		return lamda;
	} else {
		// pt1.x == pt2.x
		if (pt1.y == pt2.y) {
			var inverse = mod_inverse_num(2*pt1.y, p);
			if (inverse < 0) {
				inverse += p;
        	}
			var lamda = (3*pt1.x*pt1.x + a)*inverse;
			lamda = lamda%p;
			return lamda;
		} else {
			// y1 == -y2
			return 0;
		}
	}
}

function point_add(pt1, pt2, a, p) {
	if (pt1.x == 0 && pt1.y == 0) {
		return pt2;
	}

	// body...
	var lamda = get_lamda(pt1, pt2, a, p);
	if (lamda < 0) {
		// todo: move to the get_lamda
		lamda += p;
	}

	if (lamda == 0) {
		return { x: 0, y: 0};
	}

	// console.log("lamda = " + lamda);
	var x3 = lamda*lamda - pt1.x - pt2.x;
	x3 = x3 % p;
	if (x3 < 0) {
		x3 += p;
	}

	var y3 = lamda * (pt1.x - x3) - pt1.y;
	y3 = y3 % p;
	if (y3 < 0) {
		y3 += p;
	}

	var pt = {};
	pt.x = x3;
	pt.y = y3;
	return pt;
}

var pt1 = {};
pt1.x = 2;
pt1.y = 6;

var pt2 = {};
pt2.x = 2;
pt2.y = 6;

// console.log(point_add(pt1, pt2, 1, 11));

for (var i = 0; i < 54; i++) {
	// console.log(pt1, pt2);
	pt1 = point_add(pt1, pt2, 1, 127);
	console.log(i+2, pt1);
}

// 求椭圆曲线上点的个数
function oval_points_count(a, b, p) {
	// body...
	// var count = 0;
	var info = new Array();

	for (var i = 0; i < p; i++) {
		var data = {};
		data.x = i;

		var z = Math.pow(i, 3) + a*i + b;
		z = z % p;
		data.z = z;

		var ep = (p-1)/2;	// 欧拉准则
		var z2 = fast_power(z, ep, p);
		if (z2 == 1) {
			data.z2 = "是";
			var pow = (p+1)/4;	// 老师准则 - 幂公式
			var y = fast_power(z, pow, p);
			// console.log(i, y, p-y);
			// count += 2;
			data.y1 = y;
			data.y2 = p-y;
		} else {
			data.z2 = "否";
		}
		info.push(data);
	}

	return info;
	// return count;
}

// var points = oval_points_count(1, 6, 11);
// console.log(points);

// console.log("count = " + oval_points_count(1, 1, 19));
