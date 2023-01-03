const date = document.querySelector(".date")
const today = new Date()

// 當下日期

function getDatetime(){
    date.innerHTML=(today.getMonth()+1) + " 月 " + today.getDate() + " 日 "
};


// 切換
const toggleButton=document.querySelector('#toggleButton');
const body=document.querySelector('body');
const nav = document.querySelector('.nav');
function toggle(){
    toggleButton.classList.toggle('light');
    body.classList.toggle('light');
    nav.classList.toggle('light');
    $(".background_image_1").toggle();
}

