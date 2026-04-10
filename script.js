function gid(id){
    return document.getElementById(id);
}

function gva(name){
    return document.querySelector("input[name='" + name + "']:checked").value;
}

function setMsg(text) {
    gid('msg').innerHTML = text;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function time() {
    let now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
    let month = months[now.getMonth()];
    let day = now.getDate();
    let year = now.getFullYear();
    let timeString = now.toLocaleTimeString();

    let suffix = "th";
    if (day < 11 || day > 13) {
        if (day % 10 === 1) suffix = "st";
        else if (day % 10 === 2) suffix = "nd";
        else if (day % 10 === 3) suffix = "rd";
    }
    gid('date').textContent = month + " " + day + suffix + ", " + year + " - " + timeString;
}

setInterval(time, 1000);
time();

var rawName = prompt("what's your name?");
var playerName = capitalize(rawName);

var scoreArray = [];
var timeArray = [];
var wins = 0;
var num, guesses, startTime;

gid('fastest').textContent = "0";
gid('avgTime').textContent = "0";

function updateScore(currentScore) {
    scoreArray.push(currentScore);
    scoreArray.sort(function(a, b) { return a - b; });

    let sum = 0;
    for (let i = 0; i < scoreArray.length; i++) {
        sum += scoreArray[i];
    }
    let avg = sum / scoreArray.length;
    
    gid('wins').textContent = "Total wins: " + wins;
    gid('avgScore').textContent = avg.toFixed(1);

    let listItems = document.getElementsByName('leaderboard');
    for (let i = 0; i < listItems.length; i++) {
        if (scoreArray[i] !== undefined) {
            listItems[i].textContent = scoreArray[i];
        } else {
            listItems[i].textContent = "--";
        }
    }
}

function updateTimers() {
    let endTime = new Date().getTime();
    let duration = (endTime - startTime) / 1000;
    timeArray.push(duration);

    let fastest = timeArray[0];
    let sumTime = 0;

    for (let i = 0; i < timeArray.length; i++) {
        if (timeArray[i] < fastest) {
            fastest = timeArray[i];
        }
        sumTime += timeArray[i];
    }

    let avgTime = sumTime / timeArray.length;

    gid('fastest').textContent = fastest.toFixed(1);
    gid('avgTime').textContent = avgTime.toFixed(1);
}

gid("playBtn").addEventListener("click", function(){
    num = Math.floor(Math.random() * parseInt(gva('level'))) + 1;
    startTime = new Date().getTime();
    setMsg(playerName + ", guess the number!");
    gid('guessBtn').disabled = false;
    gid('giveUpBtn').disabled = false;
    gid('playBtn').disabled = true;
    guesses = 0;
});

gid('guessBtn').addEventListener('click', function(){
    guesses += 1;
    let guess = parseInt(gid('guess').value);
    let msgtext = "";

    if (!(isNaN(guess))){
        if (guess > num){
            msgtext = 'too high';
        } else if (guess < num ) {
            msgtext = 'too low';
        } else {
            wins += 1;
            setMsg('correct! ' + playerName + ' won!');
            gid('guessBtn').disabled = true;
            gid('giveUpBtn').disabled = true;
            gid('playBtn').disabled = false;
            updateScore(guesses);
            updateTimers();
            return;
        }
        
        let warmth = Math.abs(guess - num);
        if (warmth <= 2) msgtext += ', hot!';
        else if (warmth <= 5) msgtext += ', warm!';
        else msgtext += ', cold!';
        
        setMsg(msgtext);
    }
});

gid('giveUpBtn').addEventListener('click', function(){
    let penaltyScore = parseInt(gva('level'));
    setMsg('The number was ' + num + '.');
    updateScore(penaltyScore); 
    updateTimers();
    
    gid('guessBtn').disabled = true;
    gid('giveUpBtn').disabled = true;
    gid('playBtn').disabled = false;
    gid('guess').value = "";
});