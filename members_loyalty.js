const members = data.results[0].members;
let statistics = {
    "numberOfDemocrats": 0,
    "numberOfRepublicans": 0,
    "numberOfIndependents": 0,
}

let votesWithDemocratsParty = 0;
let votesWithRepublicansParty = 0;
let votesWithIndependentsParty = 0;

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
    let membersstatistics = " ";
  
     // starting of senate glance table
    membersstatistics = "<table>";

    // Table headers
    membersstatistics += "<tr>";
    membersstatistics += "<th class='header'>" + "Party" + "</th>";
    membersstatistics += "<th class='header'>" + "No. of Reps" + "</th>";
    membersstatistics += "<th class='header'>" + "Percentage Of Votes With Party" + "</th>";
    membersstatistics += "</tr>";

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

    // Total number of members in all party (105)
    let total = statistics.numberOfDemocrats + statistics.numberOfRepublicans + statistics.numberOfIndependents;

    // Total number of members voted out of 105 (98.04 members)
    let totalMembersVoted = averagePercentageOfDemocrats.toFixed(2) / 100 * statistics.numberOfDemocrats + averagePercentageOfRepublicans.toFixed(2) / 100 * statistics.numberOfRepublicans +
        averagePercentageOfIndependents.toFixed(2) / 100 * statistics.numberOfIndependents;

    // Average percentageof members voted (98.04/105 *100 == 93.37%)
    let averagePercentageOfMembersVoted = totalMembersVoted / total * 100;

    if( window.location.href.includes("senate")) {
        totalMembersVoted = averagePercentageOfDemocrats.toFixed(2) / 100 * statistics.numberOfDemocrats + averagePercentageOfRepublicans.toFixed(2) / 100 * statistics.numberOfRepublicans +
        averagePercentageOfIndependents.toFixed(2) / 100 * statistics.numberOfIndependents;
    } else if (window.location.href.includes("house")) {
        totalMembersVoted = averagePercentageOfDemocrats.toFixed(2) / 100 * statistics.numberOfDemocrats + averagePercentageOfRepublicans.toFixed(2) / 100 * statistics.numberOfRepublicans;
        averagePercentageOfIndependents = 0;
        averagePercentageOfMembersVoted = totalMembersVoted/total *100;
    }
    
    membersstatistics += "<tr>";
    membersstatistics += "<td class='party'>" + "Democrats" + "</td>";
    membersstatistics += "<td>" + statistics.numberOfDemocrats + "</td>";
    membersstatistics += "<td>" + averagePercentageOfDemocrats.toFixed(2) + " %" + "</td>";
    membersstatistics += "</tr>";

    membersstatistics += "<tr>";
    membersstatistics += "<td class='party'>" + "Republicans" + "</td>";
    membersstatistics += "<td>" + statistics.numberOfRepublicans + "</td>";
    membersstatistics += "<td>" + averagePercentageOfRepublicans.toFixed(2) + " %" + "</td>";
    membersstatistics += "</tr>";

    membersstatistics += "<tr>";
    membersstatistics += "<td class='party'>" + "Independents" + "</td>";
    membersstatistics += "<td>" + statistics.numberOfIndependents + "</td>";
    membersstatistics += "<td>" + averagePercentageOfIndependents.toFixed(2) + " %" + "</td>";
    membersstatistics += "</tr>";

    membersstatistics += "<tr>";
    membersstatistics += "<td class='party'>" + "Total" + "</td>";
    membersstatistics += "<td>" + total + "</td>";
    membersstatistics += "<td>" + averagePercentageOfMembersVoted.toFixed(2) + " %" + "</td>";
    membersstatistics += "</tr>";
    
    membersstatistics += "</table>";
    document.getElementById(tableId).innerHTML = membersstatistics;
}

getTable(sumOfPercentageVotes(members), "table-data");

//---------------------functions for 10 percent loyalty table------------------------------------------//
// function to calculate the table data like Names, missed votes, and %missed votes
function calculateLoyal(members) {
    let tenPercentOfTheLength = members.length * 0.1; // creating 10% of members length
    let tenPercentArray = []; // Creating an empty array 
    // For loop for getting through all the table data 
    for (i = 0; i < members.length; i++) {
        if (i < tenPercentOfTheLength) {
            tenPercentArray.push(members[i]); // adding elements to the array if its less than 10% of members length
        } else if (members[i].votes_with_party_pct === members[i - 1].votes_with_party_pct) {
            tenPercentArray.push(members[i]); // adding elements to the array if members with percentage votes with party is same as previous member
        } else {
            break; // if the elements are not less than 10% of members length, break the loop  (eg. break after 439 if total elements are 450) 
        }
    }
    return tenPercentArray;

}

// function to create the ten percent senate attendance table (least loyal)
function createTenPercentTable(members, tableId) {

    let membersLoyaltystatistics = "";
    membersLoyaltystatistics = "<table>";
    // Table headers
    membersLoyaltystatistics += "<tr>";
    membersLoyaltystatistics += "<th>" + "Name" + "</th>";
    membersLoyaltystatistics += "<th>" + "Party Votes" + "</th>";
    membersLoyaltystatistics += "<th>" + "Percentage Party Votes" + "</th>";
    membersLoyaltystatistics += "</tr>";

    for (i = 0; i < members.length; i++) {
        if (members[i].middle_name === null) {
            members[i].full_name = members[i].first_name + " " + members[i].last_name
        } else {
            members[i].full_name = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name
        }

        membersLoyaltystatistics += "<tr>";
        membersLoyaltystatistics += `<td class='name-cell'><a href='${members[i].url}'> ${members[i].full_name}</a> </td>`
        membersLoyaltystatistics += "<td>" + members[i].total_votes + "</td>";
        membersLoyaltystatistics += "<td>" + members[i].votes_with_party_pct + " %" + "</td>";
        membersLoyaltystatistics += "</tr>";
    }
    membersLoyaltystatistics += "</table>";
    document.getElementById(tableId).innerHTML = membersLoyaltystatistics;
}

//Create ascending and descending order of percentage of votes party
const sortedLeastLoyal = [...members.sort((a, b) => Number(a.votes_with_party_pct) - Number(b.votes_with_party_pct))]; //ascending 
const sortedMostLoyal = [...members.sort((a, b) => Number(b.votes_with_party_pct) - Number(a.votes_with_party_pct))]; //descending

// Call both the functions

createTenPercentTable(calculateLoyal(sortedLeastLoyal), "table-least-loyal");
createTenPercentTable(calculateLoyal(sortedMostLoyal), "table-most-loyal");