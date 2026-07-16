function openEnvelope(){

    document.getElementById("envelope").classList.add("open");

    setTimeout(function(){

        document.getElementById("welcomeScreen").style.display="none";

        document.getElementById("app").classList.remove("hidden");

    },1200);

}


let letters = JSON.parse(localStorage.getItem("letters")) || [];

displayLetters();

function saveLetter(){

    let title = document.getElementById("title").value;
    let message = document.getElementById("message").value;
    let unlockDate = document.getElementById("unlockDate").value;

    if(title == "" || message == "" || unlockDate == ""){
        alert("Please fill out everything.");
        return;
    }

    let letter = {
        title: title,
        message: message,
        unlockDate: unlockDate
    };

    letters.push(letter);

    localStorage.setItem("letters", JSON.stringify(letters));

    document.getElementById("title").value = "";
    document.getElementById("message").value = "";
    document.getElementById("unlockDate").value = "";

    displayLetters();
}

function displayLetters(){

    let area = document.getElementById("letters");

    area.innerHTML = "";

    let today = new Date();

    letters.forEach(function(letter,index){

        let unlock = new Date(letter.unlockDate);

        let div = document.createElement("div");
        div.className = "savedLetter";

        if(today >= unlock){

            div.innerHTML = `
                <h3>${letter.title}</h3>
                <p class="unlocked">🔓 Unlocked</p>
                <p>${letter.message}</p>

                <button class="deleteBtn"
                onclick="deleteLetter(${index})">
                Delete
                </button>
            `;

        }else{

            div.innerHTML = `
                <h3>${letter.title}</h3>
                <p class="locked">
                🔒 Locked until ${letter.unlockDate}
                </p>

                <button disabled>
                Locked
                </button>
            `;

        }

        area.appendChild(div);

    });

}

function deleteLetter(index){

    letters.splice(index,1);

    localStorage.setItem("letters", JSON.stringify(letters));

    displayLetters();

}