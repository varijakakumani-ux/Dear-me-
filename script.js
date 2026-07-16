// ---------------- Envelope Opening ----------------

function openEnvelope(){

    const envelope = document.getElementById("envelope");

    envelope.classList.add("open");

    setTimeout(function(){

        document.getElementById("welcomeScreen").style.display = "none";

        document.getElementById("app").classList.remove("hidden");

    },1200);

}


// ---------------- Letters Storage ----------------

let letters = JSON.parse(localStorage.getItem("letters")) || [];


// Set minimum unlock date to today

document.getElementById("unlockDate").min =
    new Date().toISOString().split("T")[0];


// Load saved letters

displayLetters();


// ---------------- Save Letter ----------------

function saveLetter(){

    let title =
        document.getElementById("title").value.trim();

    let message =
        document.getElementById("message").value.trim();

    let unlockDate =
        document.getElementById("unlockDate").value;


    if(!title || !message || !unlockDate){

        alert("Please fill out everything.");

        return;

    }


    // Prevent past dates

    let today = new Date();

    today.setHours(0,0,0,0);


    let chosenDate = new Date(unlockDate);

    chosenDate.setHours(0,0,0,0);


    if(chosenDate < today){

        alert("Unlock date cannot be in the past.");

        return;

    }



    let letter = {

        title:title,

        message:message,

        unlockDate:unlockDate,

        created:new Date().toISOString()

    };


    letters.push(letter);


    localStorage.setItem(
        "letters",
        JSON.stringify(letters)
    );


    // Clear inputs

    document.getElementById("title").value = "";

    document.getElementById("message").value = "";

    document.getElementById("unlockDate").value = "";


    displayLetters();


    alert("💌 Your letter has been locked!");

}


// ---------------- Display Letters ----------------

function displayLetters(){

    let area =
        document.getElementById("letters");


    area.innerHTML = "";


    let today = new Date();

    today.setHours(0,0,0,0);



    letters.forEach(function(letter,index){


        let unlock =
            new Date(letter.unlockDate);


        unlock.setHours(0,0,0,0);



        let div =
            document.createElement("div");


        div.className = "savedLetter";



        if(today >= unlock){


            div.innerHTML = `

                <div class="letterHeader"
                     onclick="toggleLetter(${index})">

                    <h3>${escapeHTML(letter.title)}</h3>

                    <span>
                        🔓 Unlocked
                    </span>

                </div>


                <div class="letterContent"
                     id="content${index}">

                    <p>
                        ${escapeHTML(letter.message)}
                    </p>


                    <button 
                        class="deleteBtn"
                        onclick="deleteLetter(${index})">

                        Delete

                    </button>

                </div>

            `;


        }


        else{


            div.innerHTML = `

                <h3>
                    ${escapeHTML(letter.title)}
                </h3>


                <p class="locked">

                    🔒 Locked until 
                    ${letter.unlockDate}

                </p>


                <button disabled>

                    Locked

                </button>

            `;


        }



        area.appendChild(div);


    });


}


// ---------------- Open / Close Letters ----------------

function toggleLetter(index){

    let content =
        document.getElementById(
            "content" + index
        );


    if(content.style.display === "block"){

        content.style.display = "none";

    }

    else{

        content.style.display = "block";

    }

}



// ---------------- Delete Letter ----------------

function deleteLetter(index){


    let confirmDelete =
        confirm(
            "Delete this letter forever?"
        );


    if(!confirmDelete){

        return;

    }


    letters.splice(index,1);


    localStorage.setItem(
        "letters",
        JSON.stringify(letters)
    );


    displayLetters();


}


// ---------------- Security Helper ----------------

// Prevent HTML injection

function escapeHTML(text){

    return text
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}