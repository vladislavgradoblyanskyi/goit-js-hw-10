import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');


form.addEventListener('submit',(event) => {
    
    event.preventDefault();

    const radio = document.querySelector('[name="state"]:checked');
    const delay = document.querySelector('input[name="state"]').value;

    const promise  = new Promise((resolve,reject) =>{
    setTimeout(() =>{
    if(radio.value == 'fulfilled'){
        resolve(delay);
    }
    if(radio.value == 'rejected'){
        reject(delay);
    }
    }
    ,delay)
    })
    promise
        .then(delay =>{
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: "topRight",
            });
        })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: "topRight",
                });
        })
})