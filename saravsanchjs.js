// import myJson from './qid.json' assert {type: 'json'};	
import myJson1 from './question.json' assert {type: 'json'};
import myJson2 from './answers.json' assert {type: 'json'};

let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
}
if (localStorage.getItem("test_number")=="B"){
    var myJson = {
        "1": "27_1",
        "2": "27_2",
        "3": "27_3",
        "4": "27_4",
        "5": "27_5"
    }
}
else if (localStorage.getItem("test_number")=="A"){
    var myJson = {
        "1": "28_1",
        "2": "1_2",
        "3": "1_3",
        "4": "1_4"
    }
}

// fetch("https://game-dev-plus.onrender.com/questions", {
//     method: "GET",
//     headers: headersList
// }).then(response => response.text()).then(data => {
//     myJson = data;
//     // myJson = convert all the keys from string to int
//     myJson = JSON.parse(myJson);
//     console.log(myJson);

    function getCurrentDateTime() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based (0 = January)
        const currentDay = currentDate.getDate().toString().padStart(2, '0');
        const currentHour = currentDate.getHours().toString().padStart(2, '0');
        const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');
        const currentSecond = currentDate.getSeconds().toString().padStart(2, '0');
    
        const formattedDateTime = `${currentYear}-${currentMonth}-${currentDay} ${currentHour}:${currentMinute}:${currentSecond}`;
    
        return formattedDateTime;
    }

    const buttons = Object.keys(myJson).length;
    var count = 0;
    var counter = 0;
    var button;
    console.log("he");
    var starttime=getCurrentDateTime();
    var endtime="10"; 
    for (let i = 1; i <= buttons; i++) {
        //console.log(myJson[i]);
        //console.log(myJson[i].split('_')[0]);
        //console.log(Object.keys(myJson1[myJson[i].split('_')[0]][myJson[i].split('_')[1]]).length);
        count = count + Object.keys(myJson1[myJson[i].split('_')[0]][myJson[i].split('_')[1]]).length;
        console.log(count);
    }
    // Function to show the popup
    console.log(count);
    var qarray = {};
    let ansarray = Array(count).fill("");
    console.log(ansarray);
    //var ansarray={};
    var answersarray = {};
    var marks = 0;
    const totalTimes = Array(count).fill(0); // Initialize an array to store total times for each question
    const count_time = Array(count).fill(0);
    const startTimes = []; // Array to store start times for each question
    const endTimes = [];   // Array to store end times for each question

    function showPopup() {
        const popup = document.getElementById("popup");
        const blurBackground = document.getElementById("blurBackground");
        const temp = document.getElementById("cont")
        const temp1 = document.getElementById("board");
        const temp2 = document.getElementById("timer");
        temp.style.opacity = 0;
        temp2.style.opacity = 0;
        var score = 0;
        var unattempted = 0;
        // temp1.style.opacity = 0;
        for(let i = 0; i<count; i++){
            if ( ansarray[i]==answersarray[i]){
                score = score + 1;
            }
            if (ansarray[i]==""){
                unattempted = unattempted + 1;
            }
    
        }
        const score_btn = document.getElementById("score");
        score_btn.innerHTML = `गुण: ${score}`;
        const correct_btn = document.getElementById("correct");
        correct_btn.innerHTML = `बरोबर उत्तरे: ${score}`;
        const incorrect_btn = document.getElementById("incorrect");
        incorrect_btn.innerHTML = `चूक उत्तरे: ${count-score-unattempted}`;
        const unattempted_btn = document.getElementById("unattempted");
        unattempted_btn.innerHTML = `न सोडवलेले प्रश्न: ${unattempted}`;
    
        const close = document.getElementById("closePopupButton"); 
        close.style.backgroundColor = "red";
        close.style.color = "white";
        popup.style.display = "block";
        blurBackground.style.display = "block";
    }
    
    // Function to close the popup
    function closePopup() {
        const popup = document.getElementById("popup");
        const blurBackground = document.getElementById("blurBackground");
        popup.style.display = "none";
        blurBackground.style.display = "none";
        window.location.href = "index.html";
    }
    
    // Event listener for the "Show Score" button (You can use any button you want)
    
    // Event listener for the "Close" button in the popup
    const closePopupButton = document.getElementById("closePopupButton");
    closePopupButton.addEventListener("click", closePopup);
    
    

    for (let i = 1; i <= Object.keys(myJson).length; i++) {
        for (let j = 1; j <= Object.keys(myJson1[myJson[i].split('_')[0]][myJson[i].split('_')[1]]).length; j++) {
            qarray[counter] = myJson1[myJson[i].split('_')[0]][myJson[i].split('_')[1]][j];
            answersarray[counter] = myJson2[myJson[i].split('_')[0]][myJson[i].split('_')[1]][j].trim();
            // var button = document.getElementById(`question${counter}`);
            // button.addEventListener("click", function() {
            //     // perform an action when the button is clicked
            // var element = document.getElementById("board");
            // element.innerHTML = myJson1[myJson[i].split('_')[0]][myJson[i].split('_')[1]][j];
            // counter=counter+1;
            // console.log(counter) 


            // });
            counter = counter + 1;

        }
    }
    let intervalId = null; // Store the interval ID to later clear the interval

    function incrementCounter(i) {
        count_time[i - 1]++;
        // const counterElement = document.getElementById('counter');
        // counterElement.textContent = count;
        console.log(count_time[i - 1]);
    }

    function startTimer(i) {
        intervalId = setInterval(() => incrementCounter(i), 1000);
    }

    function pauseTimer() {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }//setInterval(() => incrementCounter(0), 1000);
    // JavaScript code to add buttons with unique IDs
    const buttonContainer = document.getElementById("autobtn");

    function addButtons() {
        const numberOfButtons = count;

        for (let i = 1; i <= numberOfButtons; i++) {
            const button = document.createElement("button");
            button.className = "my-button";
            button.id = `question${i}`;
            button.textContent = `प्रश्न ${i}`;
            button.addEventListener("click", function () {
                startTimes[i - 1] = new Date(); // Record the start time for this question
                var element = document.getElementById("board");
                element.innerHTML = qarray[i - 1] + `<br><button class='button nonod-kara' id='tapasa${i}' >नोंद करा</button>`;

                const selectedOptionId = localStorage.getItem(`selectedOption${i}`);
    
                if (selectedOptionId) {
                    const selectedOption = document.getElementById(selectedOptionId);
        
                    if (selectedOption) {
                        selectedOption.checked = true;
                    }
                }
                const check = document.getElementById(`tapasa${i}`)
                check.addEventListener("click", function () {
                    //ansarray[i-1] = result.toString();
                    endTimes[i - 1] = new Date(); // Record the end time for this question
                    // Calculate the time spent on this question in milliseconds
                    const timeSpent = endTimes[i - 1] - startTimes[i - 1];

                    // Convert the time spent to seconds
                    const timeSpentInSeconds = timeSpent / 1000;
                    if (count_time[i - 1] != 0) {
                        count_time[i - 1] = count_time[i - 1] + timeSpentInSeconds;
                        console.log(`Question ${i} Time Spent: ${count_time[i - 1]} seconds`);
                    }
                    else {

                        console.log(`Question ${i} Time Spent: ${timeSpentInSeconds} seconds`);
                        count_time[i - 1] = timeSpentInSeconds;
                    }
                    if (document.querySelector('table')) {
                        // The element exists

                        var numInput = document.getElementById('num');
                        var result = parseFloat(numInput.value);
                        // var trim_value = result.trim();
                        ansarray[i - 1] = result.toString();
                        console.log(ansarray);
                        console.log('The element exists.');

                        //                             // dynamic css
                        //                     if (ansarray.length>0){
                        //                     for(i = 0;i<ansarray.length;i++){
                        //                         if(ansarray[i]!=""){
                        //                             console.log(`button${i+1}`);
                        //         }
                        //     }
                        // }

                    }
                    else if (document.querySelector('ul')) {
                        // Get all radio buttons with the name "answer"
                        const radioButtons = document.querySelectorAll('input[name="answer"]');

                        // Iterate through radio buttons to find the selected one
                        let selectedValue = null;
                        for (const radioButton of radioButtons) {
                            if (radioButton.checked) {
                                selectedValue = radioButton.value;
                                localStorage.setItem(`selectedOption${i}`, radioButton.id);

                                break; // Stop iterating once a selected button is found
                            }
                        }

                        if (selectedValue !== null) {
                            var trim_value = selectedValue.trim();
                            ansarray[i - 1] = trim_value.toString();
                            console.log(ansarray);
                        } else {
                            alert('Please select an option.');
                        }
                    }
                    else if (document.querySelector('h3')) {
                        // The element exists
                        var numInput = document.getElementById('num');
                        var result = parseFloat(numInput.value);
                        // var trim_value = result.trim();
                        ansarray[i - 1] = result.toString();
                        console.log(ansarray);
                        console.log('The element exists.');
                    }
                    else {
                        // The element does not exist
                        console.log('The element does not exist.');
                    }
                    for (let j = 0; j<count; j++){
                        if (ansarray[j]!=""){
                            console.log(j+1);
                            var button_css = document.getElementById(`question${j+1}`);
                            button_css.style.backgroundColor = "#3e8e41";
                        }
                    }
                    // if (i<(numberOfButtons-1)){
                    //     var element = document.getElementById("board");
                    //     element.innerHTML = qarray[i] + `<br><button class='button nonod-kara' id='tapasa${i+1}' >नोंद करा व पुढे चला</button>`;
        
                    // }

                })
            })
            buttonContainer.appendChild(button);
            buttonContainer.appendChild(document.createElement("br"));
            if (i == numberOfButtons) {
                const button = document.createElement("button");
                button.className = "my-button";
                button.id = `question01`;
                button.textContent = `समाप्त करा`;
                button.addEventListener("click", function () {
                    endtime = getCurrentDateTime();
                    console.log(starttime);
                    console.log(endtime);
                    showPopup();
                    for (let i = 0; i < count; i++) {
                        if (ansarray[i] == answersarray[i]) {
                            marks = marks + 1;
                            console.log(marks);

                        }
                        else {
                            console.log(ansarray[i]);
                            
                        }
                    }

                    let headersList = {
                        "Accept": "*/*",
                        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                        "Content-Type": "application/json"
                    }

                    var questionContent = [];
                    for (let i = 0; i < count; i++) {
                        var tempCorrect = "";
                        if (ansarray[i] == answersarray[i]) {
                            tempCorrect = "correct";
                        }
                        else if (ansarray[i] == "") {
                            tempCorrect = "unattempted";
                        }
                        else {
                            tempCorrect = "not"
                        }
                        questionContent.push({
                            "id": i + 1,
                            "status": tempCorrect,
                            "time_taken": count_time[i]
                        });
                    }

                    console.log(questionContent);


                    // get name, roll, phone, school, class from local storage
                    let id = localStorage.getItem("id");

                    let bodyContent = JSON.stringify({
                        "student_id": id,
                        "start_time" : starttime,
                        "end_time" : endtime,
                        "test_questions_data": questionContent
                    }
                    );

                    fetch("https://game-dev-plus.onrender.com/addTest", {
                        //mode: 'no-cors',
                        method: "POST",
                        body: bodyContent,
                        headers: headersList
                    }).then(response => response.text()).then(data => {
                        console.log(data);
                        localStorage.clear();
                    }).catch(err => {
                        console.error(err);
                    }
                    );

                    // alert("Score = " + marks);
                    // location.reload();
                })
                buttonContainer.appendChild(button);
                buttonContainer.appendChild(document.createElement("br"));

            }
        }

    }
    addButtons();

    // dynamic css
    if (ansarray.length != 0) {
        for (let i = 0; i < ansarray.length; i++) {
            if (ansarray[i] != "") {
                console.log(`button${i + 1}`);
            }
        }
    }


    //set timer

    // Set the time limit in seconds (e.g., 10 minutes)
    var timeLimitInSeconds = 60 * count;


    // Calculate the initial minutes and seconds
    let minutes = Math.floor(timeLimitInSeconds / 60);
    let seconds = timeLimitInSeconds % 60;

    // Get the timer element
    const timerElement = document.getElementById('timer');

    // Function to update the timer display
    function updateTimerDisplay() {
        timerElement.textContent = `उर्वरित वेळ: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Initial timer display
    updateTimerDisplay();

    // Create a countdown timer
    const countdownInterval = setInterval(function () {
        if (timeLimitInSeconds <= 0) {
            clearInterval(countdownInterval);
            timerElement.textContent = 'Time is up!';
            showPopup();
            endtime = getCurrentDateTime();
            // Add code to handle what happens when time is up
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            }

            var questionContent = [];
            for (let i = 0; i < count; i++) {
                var tempCorrect = "";
                if (ansarray[i] == answersarray[i]) {
                    tempCorrect = "correct";
                }
                else if (ansarray[i] == "") {
                    tempCorrect = "unattempted";
                }
                else {
                    tempCorrect = "not"
                }
                questionContent.push({
                    "id": i + 1,
                    "status": tempCorrect,
                    "time_taken": count_time[i]
                });
            }

            console.log(questionContent);


            // get name, roll, phone, school, class from local storage
            let id = localStorage.getItem("id");

            let bodyContent = JSON.stringify({
                "student_id": id,
                "start_time" : starttime,
                "end_time" : endtime,
                "test_questions_data": questionContent
            }
            );

            fetch("https://game-dev-plus.onrender.com/addTest", {
                //mode: 'no-cors',
                method: "POST",
                body: bodyContent,
                headers: headersList
            }).then(response => response.text()).then(data => {
                console.log(data);
                localStorage.clear();
            }).catch(err => {
                console.error(err);
            }
            );

            

        } else {
            timeLimitInSeconds--;
            minutes = Math.floor(timeLimitInSeconds / 60);
            seconds = timeLimitInSeconds % 60;
            updateTimerDisplay();
        }
    }, 1000); // Update the timer every 1 second
    // console.log(counter);
    // console.log(qarray);

    // if(counter==count){

    //     console.log("hello");
    // }



// }).catch(err => {
//     console.error(err);
// });