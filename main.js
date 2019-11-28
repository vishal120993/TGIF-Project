// Function declaration for table
function CreateTable() {
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
    for (i = 0; i < data.results[0].members.length; i++) {
        //If else to get rid of null
        if (data.results[0].members[i].middle_name === null) {
            data.results[0].members[i].full_name = data.results[0].members[i].first_name + " " + data.results[0].members[i].last_name
        } else {
            data.results[0].members[i].full_name = data.results[0].members[i].first_name + " " + data.results[0].members[i].middle_name + " " + data.results[0].members[i].last_name
        }
        // Rows with required data
        tablecontents += "<tr>";
        tablecontents += `<td class='name-cell'><a href='${data.results[0].members[i].url}'> ${data.results[0].members[i].full_name}</a> </td>`;
        tablecontents += "<td>" + data.results[0].members[i].party + "</td>";
        tablecontents += "<td>" + data.results[0].members[i].state + "</td>";
        tablecontents += "<td>" + data.results[0].members[i].seniority + "</td>";
        tablecontents += "<td>" + Math.round(data.results[0].members[i].votes_with_party_pct) + " %" + "</td>";
        tablecontents += "</tr>";
    }
    tablecontents += "</table>";
    // linking the html tables  with javascript
    document.getElementById("table-data").innerHTML = tablecontents;

}
// Calling the tables
CreateTable();