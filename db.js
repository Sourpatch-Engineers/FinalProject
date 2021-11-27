
const mongoose = require('mongoose')
const UserM = require('./models/User')
const TeamM = require('./models/Team')


module.exports.openConnectionDB = async function openConnectionDB() {
  try {
      const connection = await mongoose.connect(process.env.MONGO_URI)
  } catch(e) {
    onsole.error(e)
    process.exit(1)
  }
}
/**
 * 
 * @param {string} teamname
 * @returns the team bson file within the db using the query of teamname
 * @description takes the teamname and will return the file found inside the mondodb
 */
module.exports.loadTeam = async function loadTeam(teamname) {
    const query = {teamName: teamname}
    TeamM.findOne(query, function(err, team) {
      if(err)
        console.error(err)
      else
        return team
    })
}

/**
 * 
 * @returns an array of all teams in the metatable
 * @description returns all the teams in the table in an array format
 * @todo 
 */
module.exports.loadAllTeams = async function loadAllTeams() {
  console.log(TeamM.find())
    return TeamM.find()
}

/**
 * 
 * @param {string} teamname 
 * @param {list} memberNames 
 * @param {string} scrumMaster
 * @description inserts a new team inside the database with a list of members, duplicate errors are handled here as well. 
 */
module.exports.insertTeam = async function insertTeam(teamname, memberEmails, scrumMasterEmail) {

    const query = {teamName: teamname}
    if(!(await TeamM.findOne(query))) {
      const numMembers = memberEmails.length
      const newFile = new TeamM({
        "teamName": teamname.toLowerCase().trim(),
        "members": memberEmails,
        "scrumMaster": scrumMasterEmail.toLowerCase().trim(),
        "totalMembers": numMembers,
        "sprints": {}
        })
        newFile.save(function(err, team) {
          if(err)
            console.error(err)
            else
            console.log(`${newFile.team_name} created`)
        })
    } else {
      console.error(`${teamname} already exists`)
    }
}

/**
 * 
 * @param {string} teamname 
 * @description this will delete the file of the teamname specified
 */
module.exports.deleteTeam = async function deleteTeam(teamname) {
    const query = {teamName: teamname}

    TeamM.deleteOne(query)
    console.log(`${response.team_name} deleted`)
}

module.exports.new_team = async function new_team() {
  try {
        await client.connect()
        const db = client.db('team_meta')
        const metatable = db.collection('metatable')

        const query = {team_name: teamname}
        const team = await metatable.findOne(query)
    

  } catch (e) {
    console.error(e)
  } finally {
    client.close()
  }
}

module.exports