// Declaration of variables
let members = [];
const republicanParty = document.getElementById("defaultInline1");
const democratParty = document.getElementById("defaultInline2");
const independentParty = document.getElementById("defaultInline3");
const membersState = document.getElementById("stateFilter");
const membersSeniority = document.getElementById("seniorityFilter");
let senate_url = "https://api.propublica.org/congress/v1/113/senate/members.json";
let house_url = "https://api.propublica.org/congress/v1/113/house/members.json";

console.log(members)

if (window.location.href.includes("senate")) {
    fetchData(senate_url)
} else if (window.location.href.includes("house")) {
    fetchData(house_url)
}
async function fetchData(url) { // asynchronous function can keep other function when this function executes
    members = await fetch(url, {
            method: "get",
            headers: {
                "X-API-Key": "jyvzI6PZtumsAVGQwshG51wMzjc141KwouTgu48b"
            }
        })
        .then(response => response.json())
        .then(data => data.results[0].members)
        .catch(error => console.error(error));

    const loader = document.querySelector(".loader");
    loader.className += " hidden";

    console.log(members)

    //call the functions and add  event listeners inside async function

    showState(members);

    createTable(members, "table-data");

    democratParty.addEventListener("click", function () {
        createTable(filterMembers(members), "table-data");
    });

    republicanParty.addEventListener("click", function () {
        createTable(filterMembers(members), "table-data");
    });

    independentParty.addEventListener("click", function () {
        createTable(filterMembers(members), "table-data");
    });

    membersState.addEventListener("change", function () {
        createTable(filterMembers(members), "table-data");
    });

    membersSeniority.addEventListener("change", function () {
        createTable(filterMembers(members), "table-data");
    });
}

// Functions

// function to create table
function createTable(members, tableId) {
    let tablecontents = "";

    tablecontents = "<table>";
    // Table headers
    tablecontents += "<tr>";
    tablecontents += "<th class='header'>" + "Full Name" + "</th>";
    tablecontents += "<th class='header'>" + "Party" + "</th>";
    tablecontents += "<th class='header'>" + "State" + "</th>";
    tablecontents += "<th class='header'>" + "Seniority" + "</th>";
    tablecontents += "<th class='header'>" + "Percentage Of Votes With Party" + "</th>";
    tablecontents += "</tr>";

    // For loop for looping through all the data 

    for (i = 0; i < members.length; i++) {
        if (members[i].middle_name === null) {
            members[i].full_name = members[i].first_name + " " + members[i].last_name
        } else {
            members[i].full_name = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name
        }
        // Rows with required data
        tablecontents += "<tr>";
        tablecontents += `<td class='name-cell'><a href='${members[i].url}'> ${members[i].full_name}</a> </td>`;
        tablecontents += "<td>" + members[i].party + "</td>";
        tablecontents += "<td>" + members[i].state + "</td>";
        tablecontents += "<td>" + members[i].seniority + "</td>";
        tablecontents += "<td>" + Math.round(members[i].votes_with_party_pct) + " %" + "</td>";
        tablecontents += "</tr>";
    }

    tablecontents += "</table>";
    // linking the html tables  with javascript
    document.getElementById(tableId).innerHTML = tablecontents;

}

// function to filter out members on the basis of party and state
function filterMembers(members) {
    console.log("filterMembers")

    let array = [];
    //console.log(democratParty);
    for (let i = 0; i < members.length; i++) {
        if (membersSeniority.value == members[i].seniority || membersSeniority.value == 'all') {
            if (membersState.value == members[i].state || membersState.value == 'all') {
                if (members[i].party === "D" && democratParty.checked) {
                    array.push(members[i]);
                } else if (members[i].party === "R" && republicanParty.checked) {
                    array.push(members[i]);
                } else if (members[i].party === "I" && independentParty.checked) {
                    array.push(members[i]);
                } else if (democratParty.checked === false && republicanParty.checked === false && independentParty.checked === false) {
                    document.getElementById("filterOut").style.display = "block";
                    document.getElementById("filterOut").style.color = "green";
                    document.getElementById("filterOut").style.textAlign = "center";
                    document.getElementById("filterOut").style.fontSize = "20px";
                }
            }
        }
    }

    //console.log(array);
    return array;
}

// function to create the state options and sorting in ascending order
function showState(members) {
    let arrayOfState = [];
    let arrayOfSeniorityYear = [];

    for (let i = 0; i < members.length; i++) {
        if (!arrayOfState.includes(members[i].state)) { // in total 50 states are there! state is pushed only once
            arrayOfState.push(members[i].state);
        }

        if (!arrayOfSeniorityYear.includes(Number(members[i].seniority))) { // seniority years are only pushed once
            arrayOfSeniorityYear.push(Number(members[i].seniority));
        }
    }

    arrayOfState.sort() // alphabetically ordered states

    for (let i = 0; i < arrayOfState.length; i++) {
        let option = document.createElement('option') // create options for states
        option.setAttribute('value', arrayOfState[i]);
        option.innerHTML = arrayOfState[i]; // option are accessed as states
        membersState.appendChild(option) // select is main, option is append child
    }

    arrayOfSeniorityYear.sort(function (a, b) {
        return a - b;
    });

    for (let i = 0; i < arrayOfSeniorityYear.length; i++) {
        let option = document.createElement('option') // create options for seniority years
        option.setAttribute('value', arrayOfSeniorityYear[i]);
        option.innerHTML = arrayOfSeniorityYear[i]; // option are accessed as seniority from 
        membersSeniority.appendChild(option) // select is main, option is append child
    }
}

//--------------------------------------------------------------------------------------------------------///



/*
function show(){
    alert("Button clicked");
}

let btn = document.getElementById("Republican");
btn.addEventListener("click", show);

*/

//--------------------------------------------------------------------------------------------------------///