const inp = document.querySelector('#input');
const select = document.querySelector('#select');
const rdmButton = document.querySelector('#rdm-btn');
const factButton = document.querySelector('#fact-btn');
const insertText = document.querySelector(`.output`);
let timer = null;

const getFact = function () {
    clearTimeout(timer);
    let i = 0;
    insertText.innerHTML = '';
    if (inp.value < 0) {
        insertText.innerHTML = `Number can't be < 0`;
    } else if (!inp.value.length && select.value !== 'date') {
        insertText.innerHTML = 'Please enter a number';
    } else if (select.value === 'date' && /^[a-z]/i.test(inp.value)) {
        insertText.innerHTML = 'Please Do not write letters in date!'
    } else if (select.value === 'date' && !inp.value.length) {
        insertText.innerHTML = 'Please enter a date';
    } else {
        fetch(`http://numbersapi.com/${inp.value}/${select.value}?json`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data.text)
            return typeWritter(i, data.text);
        });
    }
}
const getRdmFact = function () {
    clearTimeout(timer);
    let i = 0;
    insertText.innerHTML = ' ';
    fetch(`http://numbersapi.com/random/${select.value}?json`).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data.text)
        return typeWritter(i, data.text);
    });
}

function typeWritter(i, text) {
    if (i < text.length) {
        insertText.innerHTML += text.charAt(i);
        i++;
        timer = setTimeout(() => {
            typeWritter(i, text);
        }, 30);
    }
}

rdmButton.addEventListener('click', getRdmFact);
factButton.addEventListener('click', getFact);
select.addEventListener('change', () => {
    if (select.value === 'date') {
        console.log('date!')
        inp.type = 'text';
        inp.placeholder = 'MM/DD';
    } else {
        // console.log(select.value);
        inp.type = 'number';
        inp.placeholder = '';
    }

});