function updateTime() {
    const now=new Date();

    const date=now.toLocaleDateString();
    const time=now.toLocaleTimeString([], {
        hour:'2-digit',
        minute:'2-digit'
    });
    document.getElementById("time").innerHTML=time;
    document.getElementById("date").innerHTML=date;
}

setInterval(updateTime, 1000);
updateTime();



const element=document.getElementById("typing");
const text1="Hello,I'm Mia Chayhoun, a CS student";
const text2=",welcome to my portfolio.";
const text3_part1="Want to see my projects?";
const text3_part2="Press on the folders!";

let i = 0;
function typeText() {
    if (i < text1.length) {
        element.innerHTML+=text1.charAt(i);
        i++;
        setTimeout(typeText, 80);
    } else {
        setTimeout(addDots, 800);
    }
}
function addDots() {
    let dots = 0;
    function typeDot() {
        if (dots<3) {
            element.innerHTML+=".";
            dots++;
            setTimeout(typeDot,200); 
        }else{
            setTimeout(removeDotsStep,400);
        }
    }
    typeDot();
}
function removeDotsStep() {
    let dots = 3;

    function removeOne() {
        if (dots > 0) {
            element.innerHTML = element.innerHTML.slice(0, -1);
            dots--;
            setTimeout(removeOne, 200);
        } else {
            setTimeout(typeMore, 300);
        }
    }

    removeOne();
}

let j = 0;
function typeMore() {
    if (j < text2.length) {
        element.innerHTML += text2.charAt(j);
        j++;
        setTimeout(typeMore, 80);
    } else {
        setTimeout(newLine, 500);
    }
}

function newLine() {
    element.innerHTML += "<br>";
    setTimeout(typeThird, 300);
}

let k = 0;
function typeThird() {
    if (k < text3_part1.length) {
        element.innerHTML += text3_part1.charAt(k);
        k++;
        setTimeout(typeThird, 80);
    } else {
        setTimeout(typeThirdPart2, 1000); 
    }
}
let m = 0;
function typeThirdPart2() {
    if (m < text3_part2.length) {
        element.innerHTML += text3_part2.charAt(m);
        m++;
        setTimeout(typeThirdPart2, 80);
    }
}
typeText();

function openWindow(element) {
    let window = element.closest(".musicplayer, .calculator,.converter, .game, .task").querySelector(".window");
    window.style.display = "block";
}

function closeWindow(element) {
    let window = element.closest(".window");
    window.style.display = "none";
}