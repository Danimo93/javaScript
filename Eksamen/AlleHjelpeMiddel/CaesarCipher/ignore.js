const selectShiftEle = document.getElementById("shift");

function generateShiftSelects() {

    for(let i = 1; i < 29; i++) {
        selectShiftEle.innerHTML += `<option value="${i}">${i}</option>`;
    }
}

window.onload = generateShiftSelects();