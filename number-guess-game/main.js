//1. 랜덤으로 숫자를 배정한다 = 정답
 
//2. 입력한 값과 정답을 비교한다

  //2-1. 정답이 입력한 값보다 높을경우 up을 출력한다
  //2-2. 정답이 입력한 값보다 낮을경우 down을 출력한다
  //2-3. 정답이 입력한 값과 동일할 경우 정답!을 출력한다 -> 게임종료

//3. 남은기회를 1번 감소시킨다
//4. 입력한 값과 정답을 비교한다
//4-1. 이전에 입력한 값과 동일할 경우 이미 입력한 값이라는 것을 알려준다




let computerNum = 0
//html의 요소를 가지고 올 수 있음
//id가 playu-button이라는 버튼클릭
let playButton = document.getElementById("play-button")
//사용자가 입력한 값
let userInput = document.getElementById("user-input")
//사용자에게 알리는 정보
let resultArea = document.getElementById("user-area")
//reset버튼
let playReset = document.getElementById("play-reset")
//기회
let chanceArea = document.getElementById("chances-area")
let chances = 5
let gameover = false
//사용자가 입력했던 값들을 모아둠
let history= []



//함수도 매개변수처럼 넘길수 있다 -  click하면 play함수 실행
playButton.addEventListener("click", play)
playReset.addEventListener("click", reset)
userInput.addEventListener("focus", function(){
  userInput.value = "";
})

//1. 랜덤번호 지정
function pickRandomNum(){
  computerNum = Math.floor(Math.random()*100)+1
  console.log("정답! : " , computerNum)
}

//2. 유저가 번호 입력, 그리고 go라는 버튼을 누름
//2-1. 만약 유저가 랜덤번호를 맞추면, 맞췄습니다
//2-2. 랜덤번호가 < 유저번호 Down!
//2-3. 랜덤번호가 > 유저번호 UP!
function play(){
  let userValue = userInput.value;

  if(userValue<1 || userValue>100){
    resultArea.textContent = "1과 100사이 숫자를 입력해 주세요"
    return
  }

  if(history.includes(userValue)){
    resultArea.textContent = "이미 입력한 숫자입니다 다른 숫자를 입력해 주세요"
    return
  }
  
  
  chances--;
  
  if(computerNum>userValue){
    resultArea.textContent = "up!!"
  }else if(computerNum<userValue){
    resultArea.textContent = "down~!!"
  }else{
    resultArea.textContent = "정답!!"
    gameover = true
  }
  history.push(userValue)
  console.log(history)
  if(chances < 1){
    gameover = true
  }
  if(gameover == true){
    playButton.disabled = true
  }
  chanceArea.textContent = `남은 기회 : ${chances}번`
}





pickRandomNum()

//3. reset버튼을 누르면 게임이 리셋된다
function reset(){
  userInput.value = ""
  pickRandomNum()
  resultArea.textContent = "결과값이 나옵니다"

}
//4. 5번의 기회를 다 쓰면 게임이 끝난다(더 이상 추측 불가, 버튼이 disable)
//5-1. 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않음
//5-2. 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않음



//enter키를 누르면 실행
function enter(e){
  if(e.keyCode == 13){
    play()
  }
}