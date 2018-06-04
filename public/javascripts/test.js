var mark = true;

let selectorAllButton = document.querySelector('#btn');

selectorAllButton.onclick = function(){
    if(mark){
        //需要选择的元素，设置为选择，同时全选按钮设为选择状态
        mark = false;
    }else{
        //所有选择的元素，设置为不选择，同时全选按钮设为非选择状态
        mark = true;
    }
}