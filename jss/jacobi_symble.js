
var fuhao = 1;

function jacobi_symbel(a, b) {
	// body...
	// 小于0的不算
	if (a < 0 || b < 0) {
		return 0;
	}

	// 判定结果
	if (a == 2) {
		var mod = b % 8;
		if (mod == 3 || mod == -3) {
			return -1*fuhao;
		} else {
			return 1*fuhao;
		}
	}

	// 判定奇数
	if (b%2 == 0) {
		// b 是偶数，错误
		return 0;
	} else {
		// b 是奇数
		if (a%2 == 0) {
			// a 是偶数
			var ta = a;
			var factor = new Array();
			while(ta % 2 == 0) {
				factor.push(2);
				ta = ta/2;
			}
			var result = 1;
			for (var i = 0; i < factor.length; i++) {
				result = result * jacobi_symbel(2, ta);
			}
			result = jacobi_symbel(ta, b);
			return result;
		} else {
			// a 是奇数
			if (a > b) {
				// 取模
				var ma = a % b;
				return jacobi_symbel(ma, b);
			} else {
				// 倒过来
				var ma = a%4;
				var mb = b%4;
				if (ma == 3 && mb == 3) {
					fuhao *= -1;
				}
				return jacobi_symbel(b, a);
			}
		}
	}
}


// console.log("jacobi");
// console.log(jacobi_symbel(7411, 9283));
console.log(jacobi_symbel(20964, 1987));