// alert("open");


var randomNumber,randomChosenColour;

var buttonColours = ["red", "blue", "green", "yellow"],gamePattern = [],userClickedPattern = [];

var level = 0,started=0;




function nextSequence()
{
    $('.game-title').html('Level '+level);
    level++;
    userClickedPattern = [];

    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    
    gamePattern.push(randomChosenColour);
    started = 1;
}

function playSound(name)
{
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour) {

    $("#"+currentColour).addClass('pressed');
    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
}, 100);
}

function checkAnswer()
{
    var ind = userClickedPattern.length-1;
    if(userClickedPattern[ind]==gamePattern[ind])
    {
        playSound(userChosenColour);

        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
        }, 1000);
        }

    } else {
        playSound('wrong');
        $('.game-title').html('Game Over, Press Any Key to Restart');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
    }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
}


// for starting a game on pressed A or a
$(document).on('keypress',function(e) {

    if((e.which == 65 || e.which==97) && level==0) {
        nextSequence();

    }
});


// for user selection to win the level
var userChosenColour ;
$(".box").on("click",function(){
    userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
});


// for restart the level

$(document).on('keypress',function(e) {
    if(started==1 && level==0) 
    {
        nextSequence();
    }
});


