// remember to look in to how to access a JSON object, if you are having trouble redefining values
let statistics = {
    "numberOfDemocrats": 0,
    "numberOfRepublicans": 0,
    "numberOfIndependents": 0,
 }
// Main function for creating table dynamically

function getTable() {
    let housestatistics = " ";
    let votesWithDemocratsParty = 0;
    let votesWithRepublicansParty = 0;
    let votesWithIndependentsParty = 0;

    //for loop that create the sum of percentage votes for each party
    for (let i = 0; i < data.results[0].members.length; i++) {
        if (data.results[0].members[i].party === "D") {
            votesWithDemocratsParty += data.results[0].members[i].votes_with_party_pct;
        } else if (data.results[0].members[i].party === "R") {
            votesWithRepublicansParty += data.results[0].members[i].votes_with_party_pct;
        } else if (data.results[0].members[i].party === "I") {
            votesWithIndependentsParty += data.results[0].members[i].votes_with_party_pct;
        }
    }

    // starting of senate glance table
    housestatistics = "<table>";

    // Table headers
    housestatistics += "<tr>";
    housestatistics += "<th class ='header'>" + "Party" + "</th>";
    housestatistics += "<th class ='header'>" + "No. of Reps" + "</th>";
    housestatistics += "<th class ='header'>" + "Percentage Of Votes With Party" + "</th>";
    housestatistics += "</tr>";
    
    // for loop that finds the number of members in each party
    for (let i = 0; i < data.results[0].members.length; i++) {

        if (data.results[0].members[i].party === "D") {
            statistics.numberOfDemocrats = statistics.numberOfDemocrats + 1;


        } else if (data.results[0].members[i].party === "R") {
            statistics.numberOfRepublicans = statistics.numberOfRepublicans + 1;


        } else if (data.results[0].members[i].party === "I") {
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
   let totalMembersVoted = averagePercentageOfDemocrats.toFixed(2)/100 * statistics.numberOfDemocrats + averagePercentageOfRepublicans.toFixed(2)/100 * statistics.numberOfRepublicans 
                           //+averagePercentageOfIndependents.toFixed(2)/100 * statistics.numberOfIndependents ;
  
   // Average percentageof members voted (412.389/450 *100 == 91.64%)
   let averagePercentageOfMembersVoted = totalMembersVoted / total * 100;

    housestatistics += "<tr>";
    housestatistics += "<td class = 'party'>" + "Democrats" + "</td>";
    housestatistics += "<td class = 'center'>" + statistics.numberOfDemocrats + "</td>";
    housestatistics += "<td class = 'center'>" + averagePercentageOfDemocrats.toFixed(2) + " %" + "</td>";
    housestatistics += "</tr>";

    housestatistics += "<tr>";
    housestatistics += "<td class = 'party'>" + "Republicans" + "</td>";
    housestatistics += "<td class = 'center'>" + statistics.numberOfRepublicans + "</td>";
    housestatistics += "<td class = 'center'>" + averagePercentageOfRepublicans.toFixed(2) + " %" + "</td>";
    housestatistics += "</tr>";

    housestatistics += "<tr>";
    housestatistics += "<td class = 'party'>" + "Independents" + "</td>";
    housestatistics += "<td class = 'center'>" + statistics.numberOfIndependents+ "</td>";
    housestatistics += "<td class = 'center'>" + /*averagePercentageOfIndependents.toFixed(2)*/ 0 + " %" + "</td>";
    housestatistics += "</tr>";

    housestatistics += "<tr>";
    housestatistics += "<td class = 'party'>" + "Total" + "</td>";
    housestatistics += "<td class = 'center'>" + total + "</td>";
    housestatistics += "<td class = 'center'>" + averagePercentageOfMembersVoted.toFixed(2) + " %" + "</td>";
    housestatistics += "</tr>";
    housestatistics += "</table>";
    document.getElementById("table-data").innerHTML = housestatistics;
}

getTable();

// function to calculate the table data like Names, missed votes, and %missed votes
function calculateEngaged(members) {
    let tenPercentOfTheLength = members.length * 0.1;  // creating 10% of members length
    let tenPercentArray = [];          // Creating an empty array 
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
    
    let senateEngagedStatistics = "";
    senateEngagedStatistics = "<table>";
    // Table headers
    senateEngagedStatistics += "<tr>";
    senateEngagedStatistics += "<th>" + "Name" + "</th>";
    senateEngagedStatistics += "<th>" + "No. of Party Votes" + "</th>";
    senateEngagedStatistics += "<th>" + "Percentage Of Party Votes" + "</th>";
    senateEngagedStatistics += "</tr>";

    for (i = 0; i < members.length; i++) {
        if (members[i].middle_name === null) {
            members[i].full_name = members[i].first_name + " " + members[i].last_name
        } else {
            members[i].full_name = members[i].first_name + " " + members[i].middle_name + " " + data.results[0].members[i].last_name
        }
        
        
        senateEngagedStatistics += "<tr>";
        senateEngagedStatistics += `<td class='name-cell'><a href='${members[i].url}'> ${members[i].full_name}</a> </td>`
        senateEngagedStatistics += "<td>" + members[i].total_votes + "</td>";
        senateEngagedStatistics += "<td>" + members[i].votes_with_party_pct +" %" + "</td>";
        senateEngagedStatistics += "</tr>";
    }
    senateEngagedStatistics += "</table>";
    document.getElementById(tableId).innerHTML = senateEngagedStatistics;
}

//Create ascending and descending order of percentage of votes party
const sortedLeastLoyal = [...data.results[0].members.sort((a, b) => Number(a.votes_with_party_pct) - Number(b.votes_with_party_pct))];  //ascending 
const sortedMostLoyal = [...data.results[0].members.sort((a, b) => Number(b.votes_with_party_pct) - Number(a.votes_with_party_pct))];   //descending

// Call both the functions

createTenPercentTable(calculateEngaged(sortedLeastLoyal), "table-least-loyal");
createTenPercentTable(calculateEngaged(sortedMostLoyal), "table-most-loyal");

