
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

// 绑定加密按钮事件
document.querySelector('#btn_submit').addEventListener('click', function () {
    var d = document.getElementById('myconsole');

	var str_a = document.querySelector('#input_a').value;
    var str_b = document.querySelector('#input_b').value;

    if (str_a.length > 0 && str_b.length > 0) {
        var num_a = parseInt(str_a);
        var num_b = parseInt(str_b);
        var factor = max_factor(num_a, num_b);
        d.innerHTML = factor;
    } else {
        d.innerHTML = "请输入正确的数字";
    }
});