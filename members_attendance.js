//Declaration of variables
//const members = data.results[0].members;
let members = [];
let statistics = {
    "numberOfDemocrats": 0,
    "numberOfRepublicans": 0,
    "numberOfIndependents": 0,
}
let votesWithDemocratsParty = 0;
let votesWithRepublicansParty = 0;
let votesWithIndependentsParty = 0;
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

    console.log(members)

    // call the functions inside async function

    getTable(sumOfPercentageVotes(members), "table-data");

    createTenPercentTable(calculateEngaged(sortedLeastEngaged), "table-least-engaged");

    createTenPercentTable(calculateEngaged(sortedMostEngaged), "table-most-engaged");
    }
//---------------------functions for glance table------------------------------------------------------//
//for loop that create the sum of percentage votes for each party
function sumOfPercentageVotes(members) {

    for (let i = 0; i < members.length; i++) {
        if (members[i].party === "D") {
            votesWithDemocratsParty += members[i].votes_with_party_pct;
        } else if (members[i].party === "R") {
            votesWithRepublicansParty += members[i].votes_with_party_pct;
        } else if (members[i].party === "I") {
            votesWithIndependentsParty += members[i].votes_with_party_pct;
        }
    }
    return members;
}

// Main function for creating table dynamically
function getTable(members, tableId) {
    let membersStatistics = " ";

    // starting of senate glance table
    membersStatistics = "<table>";

    // Table headers
    membersStatistics += "<tr>";
    membersStatistics += "<th class ='header'>" + "Party" + "</th>";
    membersStatistics += "<th class ='header'>" + "No. of Reps" + "</th>";
    membersStatistics += "<th class ='header'>" + "Percentage Of Votes With Party" + "</th>";
    membersStatistics += "</tr>";

    // for loop that finds the number of members in each party
    for (let i = 0; i < members.length; i++) {

        if (members[i].party === "D") {
            statistics.numberOfDemocrats = statistics.numberOfDemocrats + 1;
        } else if (members[i].party === "R") {
            statistics.numberOfRepublicans = statistics.numberOfRepublicans + 1;
        } else if (members[i].party === "I") {
            statistics.numberOfIndependents = statistics.numberOfIndependents + 1;
        }
    }

    // average percentage of each party
    let averagePercentageOfDemocrats = votesWithDemocratsParty / statistics.numberOfDemocrats;

    let averagePercentageOfRepublicans = votesWithRepublicansParty / statistics.numberOfRepublicans;

    let averagePercentageOfIndependents = votesWithIndependentsParty / statistics.numberOfIndependents;

    // Total number of members in all party (450)
    let total = statistics.numberOfDemocrats + statistics.numberOfRepublicans + statistics.numberOfIndependents;

    // Total number of members voted out of 450 (412.389 members)
    let totalMembersVoted = averagePercentageOfDemocrats.toFixed(2) / 100 * statistics.numberOfDemocrats + averagePercentageOfRepublicans.toFixed(2) / 100 * statistics.numberOfRepublicans
    +averagePercentageOfIndependents.toFixed(2)/100 * statistics.numberOfIndependents ;

    // Average percentageof members voted (412.389/450 *100 == 91.64%)
    let averagePercentageOfMembersVoted = totalMembersVoted / total * 100;

    if( window.location.href.includes("senate")) {
        totalMembersVoted = averagePercentageOfDemocrats.toFixed(2) / 100 * statistics.numberOfDemocrats + averagePercentageOfRepublicans.toFixed(2) / 100 * statistics.numberOfRepublicans +
        averagePercentageOfIndependents.toFixed(2) / 100 * statistics.numberOfIndependents;
    } else if (window.location.href.includes("house")) {
        totalMembersVoted = averagePercentageOfDemocrats.toFixed(2) / 100 * statistics.numberOfDemocrats + averagePercentageOfRepublicans.toFixed(2) / 100 * statistics.numberOfRepublicans;
        averagePercentageOfIndependents = 0;
        averagePercentageOfMembersVoted = totalMembersVoted/total *100;
    }
    
    membersStatistics += "<tr>";
    membersStatistics += "<td class = 'party'>" + "Democrats" + "</td>";
    membersStatistics += "<td>" + statistics.numberOfDemocrats + "</td>";
    membersStatistics += "<td>" + averagePercentageOfDemocrats.toFixed(2) + " %" + "</td>";
    membersStatistics += "</tr>";

    membersStatistics += "<tr>";
    membersStatistics += "<td class = 'party'>" + "Republicans" + "</td>";
    membersStatistics += "<td>" + statistics.numberOfRepublicans + "</td>";
    membersStatistics += "<td>" + averagePercentageOfRepublicans.toFixed(2) + " %" + "</td>";
    membersStatistics += "</tr>";

    membersStatistics += "<tr>";
    membersStatistics += "<td class = 'party'>" + "Independents" + "</td>";
    membersStatistics += "<td>" + statistics.numberOfIndependents + "</td>";
    membersStatistics += "<td>" + averagePercentageOfIndependents.toFixed(2) + " %" + "</td>";
    membersStatistics += "</tr>";

    membersStatistics += "<tr>";
    membersStatistics += "<td class = 'party'>" + "Total" + "</td>";
    membersStatistics += "<td>" + total + "</td>";
    membersStatistics += "<td>" + averagePercentageOfMembersVoted.toFixed(2) + " %" + "</td>";
    membersStatistics += "</tr>";
    membersStatistics += "</table>";
    document.getElementById(tableId).innerHTML = membersStatistics;
}

//getTable(sumOfPercentageVotes(members), "table-data");



//---------------------functions for calculating 10 percent table-------------------------------------//

// function to calculate the table data like Names, missed votes, and %missed votes
function calculateEngaged(members) {
    let tenPercentOfTheLength = members.length * 0.1; // creating 10% of members length
    let tenPercentArray = []; // Creating an empty array 
    // For loop for getting through all the table data 
    for (i = 0; i < members.length; i++) {
        if (i < tenPercentOfTheLength) {
            tenPercentArray.push(members[i]); // adding elements to the array if its less than 10% of members length
        } else if (members[i].missed_votes === members[i - 1].missed_votes) {
            tenPercentArray.push(members[i]); // adding elements to the array if members with missed votes is same as previous member
        } else {
            break; // if the elements are not less than 10% of members length, break the loop  (eg. break after 94 if total elements are 105) 
        }
    }
    return tenPercentArray;

}

// function to create the ten percent senate attendance table
function createTenPercentTable(members, tableId) {

    let senateEngagedStatistics = "";
    senateEngagedStatistics = "<table>";
    // Table headers
    senateEngagedStatistics += "<tr>";
    senateEngagedStatistics += "<th>" + "Name" + "</th>";
    senateEngagedStatistics += "<th>" + "Missed Votes" + "</th>";
    senateEngagedStatistics += "<th>" + "Percentage Missed Votes" + "</th>";
    senateEngagedStatistics += "</tr>";

    for (i = 0; i < members.length; i++) {
        if (members[i].middle_name === null) {
            members[i].full_name = members[i].first_name + " " + members[i].last_name
        } else {
            members[i].full_name = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name
        }

        senateEngagedStatistics += "<tr>";
        senateEngagedStatistics += `<td class='name-cell'><a href='${members[i].url}'> ${members[i].full_name}</a> </td>`
        senateEngagedStatistics += "<td>" + members[i].missed_votes + "</td>";
        senateEngagedStatistics += "<td>" + members[i].missed_votes_pct + " %" + "</td>";
        senateEngagedStatistics += "</tr>";
    }
    senateEngagedStatistics += "</table>";
    document.getElementById(tableId).innerHTML = senateEngagedStatistics;
}

//Create ascending and descending order of missed  votes
const sortedLeastEngaged = [...members.sort((a, b) => Number(b.missed_votes) - Number(a.missed_votes))];
const sortedMostEngaged = [...members.sort((a, b) => Number(a.missed_votes) - Number(b.missed_votes))];

// Call both the functions

//createTenPercentTable(calculateEngaged(sortedLeastEngaged), "table-least-engaged");
//createTenPercentTable(calculateEngaged(sortedMostEngaged), "table-most-engaged");