// Declaration of variables
const members = data.results[0].members;
const republicanParty = document.getElementById("defaultInline1");
const democratParty = document.getElementById("defaultInline2");
const independentParty =  document.getElementById("defaultInline3");
let membersState  = document.getElementById("stateFilter");

// Functions

function createTable(members,tableId) {
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

function filterMembers (members) {
    let array  = [];
     //console.log(democratParty);
   for (let i = 0; i < members.length; i++) {
    if (membersState.value == members[i].state || membersState.value =='all') {
            if (members[i].party === "D" && democratParty.checked) {
                array.push(members[i]);
            } else if (members[i].party === "R" && republicanParty.checked) {
                array.push(members[i]);
            } else if (members[i].party === "I" && independentParty.checked) {
                array.push(members[i]);
            }
        }
    }
   //console.log(array);
   return array;
  }

function showState (members) {
    let arrayOfState = [];
    
    for (let i = 0; i < members.length; i++) {
        if (!arrayOfState.includes(members[i].state)) {
            arrayOfState.push(members[i].state);
        }
    }

    arrayOfState.sort()

    for (let i = 0; i < arrayOfState.length; i++) {
        let option = document.createElement('option')
        option.setAttribute('value', arrayOfState[i]);
        option.innerHTML = arrayOfState[i];
        membersState.appendChild(option)
    }
}
showState(members)

// Calling the table

createTable(members, "table-data");

democratParty.addEventListener("click", function () {
    createTable(filterMembers(members),"table-data");
});
republicanParty.addEventListener("click", function () {
    createTable(filterMembers(members),"table-data");
});
independentParty.addEventListener("click",  function () {
    createTable(filterMembers(members),"table-data");
});
 
membersState.addEventListener("change", function () {
    createTable(filterMembers(members), "table-data");
})


























/*
function show(){
    alert("Button clicked");
}

let btn = document.getElementById("Republican");
btn.addEventListener("click", show);

*/