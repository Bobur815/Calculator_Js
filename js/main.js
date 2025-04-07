let nums = document.querySelectorAll(".num");
let inputField = document.querySelector("input");
let clear  = document.querySelector("#clear");
let remove = document.querySelector("#remove");
let signs = document.querySelectorAll(".sign");
let dot  = document.querySelector(".dot");
let equal = document.querySelector(".equal")
const chars = "+-÷x";


function inputFont_Size(){
    const maxlength = 14;
    const baseSize = 50;

    if(inputField.value.length>maxlength){
        let extra = inputField.value.length-maxlength
        inputField.style.fontSize = `${baseSize-extra*2}px`
    }
    else{
        inputField.style.fontSize = `${baseSize}px`
    }
}

equal.addEventListener("click", () => {
    let newValue = inputField.value.replace(/x/g,"*").replace(/÷/g,"/")
    
    if (/[\+\-\*\/]$/.test(newValue)) { // inputlarning oxiri operatorlar bilan tugaganda(e.g. 2+2+), operatorni olib tashlab hisoblash 
        newValue = newValue.slice(0, -1);
    }

    let result = eval(newValue)

    inputField.value = result;
    inputFont_Size()
})

signs.forEach(sign => {
    sign.addEventListener("click", () => {
        const lastChar = inputField.value.at(-1);

        if (!isNaN(lastChar)) {
            inputField.value += sign.textContent;
        } else if (chars.includes(lastChar)) {
            inputField.value = inputField.value.slice(0, -1) + sign.textContent;
        }
        inputFont_Size()
    });
});

nums.forEach(num => {
    num.addEventListener("click", () => {
        let lastIndex = -1;

        for (let sign of chars) {
            let index = inputField.value.lastIndexOf(sign);
            if (index > lastIndex) lastIndex = index;
        }

        const afterLastSign = inputField.value.slice(lastIndex + 1);
        const isLeadingZero = afterLastSign === "0";
        const isZeroPressed = num.textContent === "0";

        // Nollar ketma-ket bosilishini oldini olish
        if (isLeadingZero && isZeroPressed) {
            return;
        }

        // 0 bosilgan bo'lsa va undan keyinoq raqam bosilsa o'rniga yozib qo'yish
        if (isLeadingZero && !isZeroPressed) {
            inputField.value = inputField.value.slice(0, -1) + num.textContent;
            return;
        }

        inputField.value += num.textContent;
        inputFont_Size()
    });
});


clear.addEventListener("click", () => inputField.value = "");

remove.addEventListener("click", () => {
    if (inputField.value) {
        inputField.value = inputField.value.slice(0, -1);
        if (inputField.value.at(-1) === ".") {
            inputField.value = inputField.value.slice(0, -1);
        }
    }
    inputFont_Size()
});

dot.addEventListener("click", () => {
    if (!inputField.value) {
        inputField.value = "0.";
        return;
    }

    let lastIndex = -1;
    for (let sign of chars) {
        let index = inputField.value.lastIndexOf(sign);
        if (index > lastIndex) lastIndex = index;
    }

    const afterLastSign = inputField.value.slice(lastIndex + 1);

    if (!afterLastSign.includes(".")) {
        inputField.value += afterLastSign ? "." : "0.";
    }
    inputFont_Size()
});

// Klaviatura bilan ishlash
document.addEventListener("keydown", (e) =>{
    const key = e.key;

    if(key==="Enter"){
        equal.click();
        return;
    }

    if(key==="Backspace"){
        remove.click();
        return;
    }

    if("0123456789+-*/.".includes(key)){
        let convertedKey = key;

        if(key==="*") convertedKey = "x";
        if(key==="/") convertedKey = "÷";

        document.querySelectorAll(".num,.sign,.dot").forEach(btn => {
            if(btn.textContent===convertedKey){
                btn.click();
            }
        })
        
    }
})