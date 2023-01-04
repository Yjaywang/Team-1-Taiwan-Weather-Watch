// 切換
const toggleButton=document.querySelector('.toggleButton');
const toggleButton_1=document.querySelector('.toggleButton_1');
const body=document.querySelector('body');
const nav = document.querySelector('.nav');
function toggle(){
    toggleButton_1.classList.toggle('light');
    toggleButton.classList.toggle('light');
    body.classList.toggle('light');
    nav.classList.toggle('light');
    $(".background_image_1").toggle();
    
}
