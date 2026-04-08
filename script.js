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
guessmounts=[]
wins=0
gid('wins').innerHTML = 'Wins: ' + wins
msgtext="";
correct=0
gid("playBtn").addEventListener("click", function(){
        num = Math.floor(Math.random()*parseInt(gva('level')))+1
        setMsg('guess the number!')
        gid('guessBtn').disabled = false
        gid('giveUpBtn').disabled = false
        gid('playBtn').disabled = true
        correct = 0
        guesses = 0
    }
)

gid('guessBtn').addEventListener('click', function(){
        guesses += 1
        guess = parseInt(gid('guess').value)
            if (!(isNaN(guess))){
                if (guess > num){
                    msgtext='too high'
                } else if (guess < num ) {
                    msgtext='too low'
                } else {
                    setMsg('correct!')
                    correct = 1
                    gid('guessBtn').disabled = true
                    gid('playBtn').disabled = false
                    wins+=1
                    guessmounts.push(guesses)
                        let sum = 0;
                        for (let i = 0; i < guessmounts.length; i++) {
                            sum += guessmounts[i];
                            console.log(i)
                        }
                        console.log(sum)
                        let av = sum / guessmounts.length;
                        gid('avgScore').innerHTML=('Average Score: '+av)
                    gid('wins').innerHTML = 'Wins: ' + wins
                    return
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