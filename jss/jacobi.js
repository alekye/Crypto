
var infos = new Array();
//性质3中，如果t=1怎么办？....下面算法中如果t=1直接返回1结束。
	function natureOne(a,n) {
		if (a<0) {
			return -(Math.abs(a)%n);
		}
		return a%n;
	}
	function natureTwo(n) {
		if (n%8==1||n%8==7) {
			return 1;
		}else if (n%8==3||n%8==5) {
			return -1;
		}
	}
	function natureThree(a,n) {
		var count = 0;
		var a1 = Math.abs(a);
		while (a1%2==0) {
			// statement
			a1 = Math.floor(a1/2);
			count +=1;
		}
		// return natureTwo(n)*a/Math.pow(2,count);
		if (count%2==0) {
			return a/Math.pow(2,count);
		}else{
			return natureTwo(n)*a/Math.pow(2,count);
		}
	}
	function natureFour(a,n) {
		var temp = 0;
		if (Math.abs(a)%4==3&&Math.abs(n)%4==3) {
			return -1;
		}else{
			return 1;
		}
	}
	function jacobi(a,n) {
		// body...
		temp = 0;
		while(a != 2){
			if (a%2!=0&&n%2!=0&&Math.abs(a)<n){
				temp = n;
				if (a<0) {
					n = Math.abs(a);
					a = - temp;
				}else{
					n = a;
					a = temp;
				}
				a = a*natureFour(a,n);
				if (Math.abs(a)==1) {
					return info_collect("1");
				}else if (a==0) {
					return info_collect("0");
				}
				info_collect(a+"/"+n+"                性质4"+"<br\>");
			}
			if (n%2!=0&&Math.abs(a)>n) {
				a = natureOne(a,n);
				if (Math.abs(a)==1) {
					return info_collect("1");
				}else if (a==0) {
					return info_collect("0");
				}
				info_collect(a+"/"+n+"                性质1"+"<br\>");
			}
			if (a%2==0&&n%2!=0&&a!=2&&Math.abs(a)!=2) {
				a = natureThree(a,n);
				if (Math.abs(a)==1) {
					return info_collect("1");
				}else if (a==0) {
					return info_collect("0");
				}
				info_collect(a+"/"+n+"                性质3 性质2"+"<br\>");
			}
			if (Math.abs(a) == 2) {
				return info_collect(a / 2 * natureTwo(n));
			}
		}
	}

function info_collect(msg) {
		// body...
		infos.push(msg);
	}
// jacobi(7411, 9283)

// jacobi(20964, 1987);
// console.log(infos);

function get_jacobi_info(a, b) {
	// body...
	infos = new Array();
	jacobi(a, b);
	return infos;
}

// console.log(get_jacobi_info(7411, 9283));
// 绑定加密按钮事件
document.querySelector('#btn_submit').addEventListener('click', function () {
    var d = document.getElementById('myconsole');

	var str_a = document.querySelector('#input_a').value;
    var str_b = document.querySelector('#input_b').value;

    if (str_a.length > 0 && str_b.length > 0) {
        var num_a = parseInt(str_a);
        var num_b = parseInt(str_b);
        var factor = get_jacobi_info(num_a, num_b);
        d.innerHTML = factor;
    } else {
        d.innerHTML = "请输入正确的数字";
    }
});


