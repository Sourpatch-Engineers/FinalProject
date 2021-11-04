exports.create_table = () => {
    var teams = [{teamName: "SourPatch Engineers", teamLeader: "Joel", teamMembers: "Alex, Bryan, Daniel, Joel, Matthew, Ryan"},
     {teamName: "Other Team", teamLeader: "Bob", teamMembers: "Bob, Jim, Steve"},
     {teamName: "Other Other Team", teamLeader: "Raul", teamMembers: "Joseph, Kyle, Simon"}]

    var rows = ""
    for (var i = 0; i < teams.length; i++) {
        teamData = teams[i]
        rows = rows + `<tr>
                        <td>${teamData.teamName}</td>
                        <td>${teamData.teamLeader}</td>
                        <td>${teamData.teamMembers}</td>
                    </tr>
                    `
    }
    table = `<table>
                <tr>
                    <td>Team Name</td>
                    <td>Team Leader</td>
                    <td>Team Members</td>
                </tr>
                ${rows}
            </table>`
    
    return table
}