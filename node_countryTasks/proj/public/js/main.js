const buttonsEl = document.querySelector('.btns');
const btnEl = document.querySelectorAll('input[name="country"]');
let loaderEl = document.querySelector('.loader');


 

for (i=0; i<btnEl.length;i++) {
    btnEl[i].addEventListener('click', () => {
        let selectedValue;
                for (const btn of btnEl) {
                    if (btn.checked) {
                        selectedValue = btn.value;
                        break;
                    }
                }
                document.location.replace(`/${selectedValue}`);
                loaderEl.style.display = "flex";
    })
}



 
