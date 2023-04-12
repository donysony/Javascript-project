let userInput = document.getElementById("user-input")
let startBtn = document.querySelector("#game-stater")
let resetBtn = document.querySelector("#game-reset")
let result = document.querySelector(".result-text")
let chanceArea = document.querySelector("#chance-area")
let computerValue = 0;
let chance = 5;
let gameOver = false;
let InputList = []; //사용자가 입력한 값을 담는 list

chanceArea.innerHTML = `남은 기회 : ${chance}`

startBtn.addEventListener("click",play) //변수로 작성
resetBtn.addEventListener("click", reset)
userInput.addEventListener("focus",InputClear)

//랜덤으로 나오는 숫자
function PlayRandomNum(){
  computerValue = Math.floor(Math.random()*100)+1
  console.log("정답 : ", computerValue)
}

//Go버튼을 누르면 게임 시작 - 숫자 추측하기
function play(){
  //사용자로 부터 입력받은 값
  let userValue = userInput.value;
  //1~100사이의 값인지 확인하는 유효성 검사
  if(userValue<1 || userValue>100){
    result.textContent = "1~100사이의 값을 입력하세요";
    return;
  }
  //입력했던 값인지 아닌지 유효성 검사
  if(InputList.includes(userValue)){
    result.textContent = "이미 입력한 값입니다. 다른 숫자를 입력하세요";
    return;
  }
  
  //기회감소
  chance--;
  chanceArea.textContent = `남은 기회 : ${chance}`;
  InputList.push(userValue);
  console.log(InputList)

  console.log("사용자 입력값 : ", userValue);
  //남은 기회 출력
  //사용자가 입력한 값과 랜덤으로 나온값 비교
  if(userValue < computerValue){
    result.textContent = "UP!!";
  }else if(userValue>computerValue){
    result.textContent = "DOWN!!";
  }else{
    result.textContent = "정답입니다~";
  //정답을 맞췄을 경우 버튼을 누를 수 없도록 만듬
    gameOver = true;
  }
  //기회를 다 사용했을 경우 
  if(chance == 0){
    gameOver = true;
  }
  //Go버튼 비활성화
  if(gameOver == true){
    startBtn.disabled = gameOver;
  }

}
//게임 reset
function reset(){
  PlayRandomNum()
  result.textContent="살고싶다면 맞추길!";
  chance = 5;
  chanceArea.textContent = `남은 기회 : ${chance}`;
  InputClear();
  startBtn.disabled = false;
  InputList = [];
}

//사용자 입력값 clear해주기
function InputClear(){
  userInput.value="";
}

PlayRandomNum();

//엔터키클릭시 동작하도록
function Enter(e){
  if(e.keyCode == 13){
    play();
    InputClear();
  }
}