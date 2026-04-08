// add javascript here
function gid(id){
    return document.getElementById(id)
}
function gva(name){
    return document.querySelector(`input[name="${name}"]:checked`).value;
}
function setMsg(text) {
    gid('msg').innerHTML = text;
}
msgtext="";
correct=0
gid("playBtn").addEventListener("click", function(){
        num = Math.floor(Math.random()*parseInt(gva('level')))
        setMsg('guess the number!')
        gid('guessBtn').disabled = false
        gid('giveUpBtn').disabled = false
        gid('playBtn').disabled = true
        correct = 0
    }
)

gid('guessBtn').addEventListener('click', function(){
        guess = parseInt(gid('guess').value)
         
            if (!(isNaN(guess))){
                if (guess > num){
                    msgtext='too high, guess lower'
                } else if (guess < num ) {
                    msgtext='too low, guess higher'
                } else {
                    msgtext='Correct!'
                    correct = 1
                    gid('guessBtn').disabled = true
                    gid('playBtn').disabled = false
                }
              
                    warmth = Math.abs(guess-num)
                    if (warmth <= 2){
                        msgtext+=', hot!'
                    } else if (warmth <= 5){
                        msgtext+=', warm!'
                    } else {
                        msgtext+=', cold!'
                    
                }
            setMsg(msgtext)
        }})

gid('giveUpBtn').addEventListener('click', function(){
    setMsg('The number was ' + num + '.');
    gid('guessBtn').disabled = true;
    gid('giveUpBtn').disabled = true;
    gid('playBtn').disabled = false;
    gid('guess').value = "";
});