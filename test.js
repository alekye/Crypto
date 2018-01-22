// var obj = {};
// obj.name = "name";
// obj.age = 123;
// console.log(obj);

// 测试引入模块的方式
// import hello_info from './testmodule.js';	// node不支持

// var hi = require('./testmodule.js');
// var info = hi.hiInfo("security");
// console.log(info);

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

// var ret = mod_inverse(4913, 30960);
// var ret = mod_inverse(104729, 15485863);
// console.log(ret);

// 快速幂取模运算
function fast_power(a, n, mod) {
	// body...
	var result = 1;
	var va = a;
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

// console.log(8>>1)
// console.log(fast_power(9726, 3533, 11413));
// console.log(fast_power(5761, 6597, 11413));

// 辗转相除法（欧氏算法）求最大公因子
function max_factor(a, b) {
	// body...
	if (a < 0 || b < 0) {
		return 0;
	}

	var remainder = a % b;
	if (remainder == 0) {
		return b;
	}

	while (remainder > 0) {
		a = b;
		b = remainder;
		remainder = a % b;
	}
	return b;
}

console.log(max_factor(35, 77))

