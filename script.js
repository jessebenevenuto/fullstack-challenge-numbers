"use strict";

const main = document.querySelector(".main");
const mainDraw = document.querySelector("#mainDraw");
const mainResults = document.querySelector("#mainResults");
const results = document.querySelector("#results");
const btnAgain = document.querySelector("#btnAgain");

const numberResults = document.querySelector("#numberResults");
let resultsQuantity = 2;

const formEl = document.querySelector("#form");
const numbersEl = document.querySelector("#numbers");
const startsEl = document.querySelector("#starts");
const endEl = document.querySelector("#end");
const repeatNumberEl = document.querySelector("#repeatNumber");

let numbersList = [];

[numbersEl, startsEl, endEl].forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D+/g, "");
  })
});

class NumberDrawer {
  constructor(numbers, starts, end){
    const error = this.validate(numbers, starts, end);
    if(error) throw new Error(error);

    this.numbers = Number(numbers);
    this.starts = Number(starts);
    this.end = Number(end);
  }

  draw(){
    let num;

    if(repeatNumberEl.checked){
      if(this.numbers > (this.end - this.starts) + 1){
        throw new Error("Não há quantidade de números suficientes dentro deste intervalo!");
      }

      while(numbersList.length + 1 <= this.numbers){
        num = Math.floor(Math.random() * (this.end - this.starts + 1) + this.starts);
        if(numbersList.indexOf(num) === -1) numbersList.push(num);
      }

    } else {
      while(numbersList.length + 1 <= this.numbers){
        num = Math.floor(Math.random() * (this.end - this.starts + 1) + this.starts);
        numbersList.push(num);
      }
    }

    mainDraw.classList.add("hidden");
    mainResults.classList.remove("hidden");

    this.showResults();
  }

  showResults(){
    let delay = 0;
    
    numbersList.forEach((number, index) => {
      const num = document.createElement("li");
      num.classList.add("number");
      num.textContent = number < 10 ? `0${number}` : number;
      
      const extraDelay = index === 0 ? 0.1 : 0; 
      num.style.setProperty("--delay", `${delay + extraDelay}s`);
      delay += 2;

      results.append(num);
    });

    btnAgain.style.setProperty("--delay", `${delay}s`);
  }

  validate(numbers, starts, end){
    if(numbers === "" || starts === "" || end === ""){
      return "Nenhum dos campos pode estar vazio!";
    }

    if(numbers < 1 || end < 1){
      return "A quantidade de números sorteados ou o máximo não podem ser zero!";
    }

    if(Number(starts) >= Number(end)){
      return "O minímo não pode ser igual nem maior que o máximo!";
    }

    if(numbers > 10){
      return "O máximo de números que podem ser sorteados é 10!";
    }

    if(end > 999){
      return "O máximo não pode ser mais do que 999!";
    }
  }
}

btnAgain.addEventListener("click", () => {
  mainDraw.classList.remove("hidden");
  mainResults.classList.add("hidden");

  numbersList = [];
  results.innerHTML = ``;

  numberResults.textContent = `${resultsQuantity++}º resultado`;
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const numberDrawer = new NumberDrawer(
      numbersEl.value,
      startsEl.value,
      endEl.value,
    );

    numberDrawer.draw();

    numbersEl.value = "";
    numbersEl.focus();

    startsEl.value = "";
    endEl.value = "";

  } catch(error){
    alert(String(error).replace("Error: ", ""));
  }
});