// remember to look in to how to access a JSON object, if you are having trouble redefining values
let statistics = {
    "numberOfDemocrats": 0,
    "numberOfRepublicans": 0,
    "numberOfIndependents": 0,
  }
// Main function for creating table dynamically

function getTable() {
    let senatestatistics = " ";
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
    senatestatistics = "<table>";

    // Table headers
    senatestatistics += "<tr>";
    senatestatistics += "<th class='header'>" + "Party" + "</th>";
    senatestatistics += "<th class='header'>" + "No. of Reps" + "</th>";
    senatestatistics += "<th class='header'>" + "Percentage Of Votes With Party" + "</th>";
    senatestatistics += "</tr>";
    
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


    //console.log(averagePercentageOfDemocrats)
    //console.log("No. of D members are " + statistics.numberOfDemocrats.length);
    //console.log("No. of R members are " + statistics.numberOfRepublicans.length);
    //console.log("No. of I members are " + statistics.numberOfIndependents.length);
    //console.log(statistics.numberOfDemocrats.length + statistics.numberOfRepublicans.length + statistics.numberOfIndependents.length);

        
    // Total number of members in all party (105)
    let total = statistics.numberOfDemocrats + statistics.numberOfRepublicans + statistics.numberOfIndependents;
    
    // Total number of members voted out of 105 (98.04 members)
    let totalMembersVoted = averagePercentageOfDemocrats.toFixed(2)/100 * statistics.numberOfDemocrats + averagePercentageOfRepublicans.toFixed(2)/100 * statistics.numberOfRepublicans +
                            averagePercentageOfIndependents.toFixed(2)/100 * statistics.numberOfIndependents ;
    
    // Average percentageof members voted (98.04/105 *100 == 93.37%)
    let averagePercentageOfMembersVoted = totalMembersVoted / total * 100;

    senatestatistics += "<tr>";
    senatestatistics += "<td class='party'>" + "Democrats" + "</td>";
    senatestatistics += "<td>" + statistics.numberOfDemocrats + "</td>";
    senatestatistics += "<td>" + averagePercentageOfDemocrats.toFixed(2) + " %" + "</td>";
    senatestatistics += "</tr>";

    senatestatistics += "<tr>";
    senatestatistics += "<td class='party'>" + "Republicans" + "</td>";
    senatestatistics += "<td>" + statistics.numberOfRepublicans + "</td>";
    senatestatistics += "<td>" + averagePercentageOfRepublicans.toFixed(2) + " %" + "</td>";
    senatestatistics += "</tr>";

    senatestatistics += "<tr>";
    senatestatistics += "<td class='party'>" + "Independents" + "</td>";
    senatestatistics += "<td>" + statistics.numberOfIndependents + "</td>";
    senatestatistics += "<td>" + averagePercentageOfIndependents.toFixed(2) + " %" + "</td>";
    senatestatistics += "</tr>";

    senatestatistics += "<tr>";
    senatestatistics += "<td class='party'>" + "Total" + "</td>";
    senatestatistics += "<td>" + total + "</td>";
    senatestatistics += "<td>" + averagePercentageOfMembersVoted.toFixed(2) + " %" + "</td>";
    senatestatistics += "</tr>";
    // }    
    senatestatistics += "</table>";
    document.getElementById("table-d").innerHTML = senatestatistics;
}



getTable();


/*
{
    let senatestatistics = "";
    senatestatistics = "<table>";
    // Table headers
    senatestatistics += "<tr>";
    senatestatistics += "<th>" + "Party" + "</th>";
    senatestatistics += "<th>" + "No. of Reps" + "</th>";
    senatestatistics += "<th>" + "Percentage Of Votes With Party" + "</th>";
    senatestatistics += "</tr>";
    for (i = 0; i < data.results[0].members.length; i++) {
        senatestatistics += "<tr>";
        senatestatistics += "<td>" + "Democrats" + "</td>";
        senatestatistics += "<td>" + statistics.numberOfDemocrats.length + "</td>";
        senatestatistics += "<td>" + i * 1000 + "</td>";
        senatestatistics += "</tr>";

        senatestatistics += "<tr>";
        senatestatistics += "<td>" + "Republicans" + "</td>";
        senatestatistics += "<td>" + statistics.numberOfRepublicans.length + "</td>";
        senatestatistics += "<td>" + i * 1000 + "</td>";
        senatestatistics += "</tr>";

        senatestatistics += "<tr>";
        senatestatistics += "<td>" + "Independents" + "</td>";
        senatestatistics += "<td>" + statistics.numberOfIndependents.length + "</td>";
        senatestatistics += "<td>" + i * 1000 + "</td>";
        senatestatistics += "</tr>";

        senatestatistics += "<tr>";
        senatestatistics += "<td>" + "Total" + "</td>";
        senatestatistics += "<td>" + statistics.numberOfDemocrats.length + statistics.numberOfRepublicans.length + statistics.numberOfIndependents.length + "</td>";
        senatestatistics += "<td>" + i * 1000 + "</td>";
        senatestatistics += "</tr>";
    }
    senatestatistics += "</table>";
    document.getElementById("table-d").innerHTML = senatestatistics;
}


*/