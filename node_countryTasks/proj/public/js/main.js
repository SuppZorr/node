const buttonsEl = document.querySelector('.btns');
const btnEl = document.querySelectorAll('input[name="country"]');
const loaderEl = document.querySelector('.loader');
const hiddenEl = document.querySelector('.hidden');



 

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
    });
    for (const btn of btnEl) {
        if (btn.value === hiddenEl.innerHTML) {
            btn.setAttribute("checked", "checked")
        }
    }
}



 
