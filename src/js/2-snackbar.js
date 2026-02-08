import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('[type="submit"]');


btn.addEventListener('click',(event) => {
    const radio = document.querySelector('[name="state"]:checked');
    event.preventDefault();

    const delay = document.querySelector("input").value;

    const promise  = new Promise((resolve,reject) =>{
    setTimeout(() =>{
    if(radio.value == 'fulfilled'){
        resolve(`✅ Fulfilled promise in ${delay}ms`);
    }
    if(radio.value == 'rejected'){
        reject(`❌ Rejected promise in ${delay}ms`);
    }
    }
    ,delay)
    })
    promise
        .then(value =>{
        iziToast.success({
            message: value,
            position: "topRight",
            });
        })
        .catch(value => {
            iziToast.error({
                message: value,
                position: "topRight",
                });
        })
})