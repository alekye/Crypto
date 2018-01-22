
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

// 素数分解
function divide_to_prime(num) {
	// body...
	var result = new Array();

	var tn = num;
	var half = tn/2+1;
	// console.log("half = " + half);
	for (var i = 2; i < half; i++) {
		while(tn%i == 0) {
			result.push(i);
			tn /= i;
		}
	}

	return result;
}

// console.log(divide_to_prime(31313));

// 字符串分割
// var cipher = "6340 8309 14010 8936 27358 25023";
// var data = cipher.split(" ");
// console.log(data);
// console.log(typeof(data[0]));

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

function rsa_decrypt(cipher, a, fn) {
	var alpha = "abcdefghijklmnopqrstuvwxyz";
	// body...
	var plainText = "";
	var data = cipher.split(" ");
	for (var i in data) {
		var encryptCode = data[i];
		var decryptCode = fast_power(encryptCode, a, fn);
		// mod 26 decrypt
		var right = decryptCode % 26;
		var quotient = Math.floor(decryptCode/26);
		var middle = quotient % 26;
		quotient = Math.floor(quotient/26);
		var left = quotient % 26;
		plainText += alpha.charAt(left) + alpha.charAt(middle) + alpha.charAt(right);
	}
	return plainText;
}

// 绑定加密按钮事件
document.querySelector('#btn_submit').addEventListener('click', function () {
    var d = document.getElementById('myconsole');

	var str_n = document.querySelector('#input_n').value;
    var str_b = document.querySelector('#input_b').value;
    var cipher = document.querySelector('#input_cipher').value;

    if (str_n.length > 0 && str_b.length > 0 && cipher.length > 0) {
    	var mstr = "";
        var num_n = parseInt(str_n);
        mstr += '<div class="weui-cell"><p>对 n = ' + num_n + ' 分解素因数：</p></div>';
        // 暴力分解n
        var prime = divide_to_prime(num_n);
        if (prime.length == 2) {
        	mstr += '<div class="weui-cell"><p>得 n = p * q = ' + prime.join(" * ") + '</p></div>';
        	var p = prime[0];
        	var q = prime[1];
        	var fin = (p-1)*(q-1);
        	mstr += '<div class="weui-cell"><p>所以 φ(n) = (p-1)(q-1) = ' + fin + '</p></div>';
        	var num_b = parseInt(str_b);
        	mstr += '<div class="weui-cell"><p>又 b = ' + num_b + '</p></div>';
        	var num_a = mod_inverse_num(num_b, fin);
        	mstr += '<div class="weui-cell"><p>所以 a = b^(-1)MODφ(n) = ' + num_b + '^(-1)MOD' + fin + ' = ' + num_a + '</p></div>';
			mstr += '<div class="weui-cell"><p>设密文为：y，则明文：x = y^aMODφ(n)，解密如下：</p></div>';
			mstr += '<div class="weui-cell"><p>' + rsa_decrypt(cipher, num_a, fin) + '</p></div>';
        } else {
        	if (prime.length > 0) {
        		mstr += '<div class="weui-cell"><p><font color="red">发生错误: n = '+ prime.join(" * ") + ' 不是两个素数的和。</font></p></div>'; 
        	} else {
        		mstr += '<div class="weui-cell"><p><font color="red">发生错误: n是一个素数，无法分解。</font></p></div>'; 
        	}
        }

        d.innerHTML = mstr;
    } else {
        d.innerHTML = "请输入正确的数字";
    }
});