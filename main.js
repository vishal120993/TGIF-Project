// Declaration of variables
const members = data.results[0].members;
const republicanParty = document.getElementById("defaultInline1");
const democratParty = document.getElementById("defaultInline2");
const independentParty = document.getElementById("defaultInline3");
const membersState = document.getElementById("stateFilter");
const membersSeniority = document.getElementById("seniorityFilter");
//let membersNames = document.getElementById("searchBar").value.toUpperCase();


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

showState(members);


// Calling the table
createTable(members, "table-data");

//Addeventlisteners for interactive checkbox and dropdown options
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

/*
membersNames.addEventListener("onkeyup", function () {
    createTable(searchNames(members), "table-data");
})
*/



// function for search bar
/*
function searchNames(members) {
    let arrayOfNames = [];

    for (let i = 0; i < members.length; i++) {
        if (membersNames.value == members[i].full_name ) {
            arrayOfNames.push(members[i]);
        }
    }
    return arrayOfNames;
}


// array.filter()
  let arrayOfCheckedBoxFilters = [];

  function filterMembers (members) {
      arrayOfCheckedBoxFilters.push(members[i].party === "D");
  }
arrayOfCheckedBoxFilters = arrayOfCheckedBoxFilters.filter(filterMembers);
console.log(arrayOfCheckedBoxFilters);
*/



// function to create senority level filter
/*function filterSeniorityMembers(members) {
    let arrayOfSeniority = [];
    //console.log(democratParty);
    for (let i = 0; i < members.length; i++) {
        if (membersSeniority.value == members[i].seniority || membersSeniority.value == 'all') {
            arrayOfSeniority.push(members[i]);
        }
    }
    //console.log(array);
    return arrayOfSeniority;
}

// function to create the seniority options and sorting in ascending order
function showSeniority(members) {
    let arrayOfSeniorityYear = [];

    for (let i = 0; i < members.length; i++) {
        if (!arrayOfSeniorityYear.includes(members[i].seniority)) { // seniority years are only pushed once
            arrayOfSeniorityYear.push(members[i].seniority);
        }
    }

    //Create ascending order of seniority year
    arrayOfSeniorityYear.sort((a, b) => Number(b.seniority) - Number(a.seniority));

    for (let i = 0; i < arrayOfSeniorityYear.length; i++) {
        let option = document.createElement('option') // create options for seniority years
        option.setAttribute('value', arrayOfSeniorityYear[i]);
        option.innerHTML = arrayOfSeniorityYear[i]; // option are accessed as seniority from 
        membersSeniority.appendChild(option) // select is main, option is append child
    }
}

showSeniority(members); */



/*
function show(){
    alert("Button clicked");
}

let btn = document.getElementById("Republican");
btn.addEventListener("click", show);

*/