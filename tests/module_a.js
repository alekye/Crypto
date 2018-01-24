// import module_info from './module_b.js';
import { module_info } from './module_b.js';
// import {sex,echo} from "./module_b.js"

// 绑定按钮事件
document.querySelector('#btn_submit').addEventListener('click', function () {
    var d = document.getElementById('myconsole');

    // d.innerHTML = "module a";
    d.innerHTML = module_info("abcd");
    // d.innerHTML = sex;
});