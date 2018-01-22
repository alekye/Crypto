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

// 绑定按钮事件
document.querySelector('#btn_submit').addEventListener('click', function () {
    var d = document.getElementById('myconsole');

    var str_x = document.querySelector('#input_x').value;
    var str_y = document.querySelector('#input_y').value;
    var str_z = document.querySelector('#input_z').value;

    if (str_x.length > 0 && str_y.length > 0 && str_z.length > 0) {
        var num_x = parseInt(str_x);
        var num_y = parseInt(str_y);
        var num_z = parseInt(str_z);
        
        var remainder = fast_power(num_x, num_y, num_z);
        var mstr = '<div class="weui-cell"><p><font color="red">余数 = ' + remainder + '</font></p></div>';
        d.innerHTML = mstr;
    } else {
        d.innerHTML = "请输入正确的数字";
    }
});