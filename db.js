
const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://app_user:ibn9j5dxCFfiuBka@cluster0.ohmbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri)

/**
 * 
 * @param {string} teamname
 * @returns the team bson file within the db using the query of teamname
 * @description takes the teamname and will return the file found inside the mondodb
 * @todo will be ids in the future rather than names
 */
module.exports.loadMetaData = async function loadMetaData(teamname) {
  try {
    await client.connect()
    const db = client.db('team_meta')
    const metatable = db.collection('metatable')
  
    const query = {team_name: teamname}
    const team = await metatable.findOne(query)
    return team
  } catch(e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

/**
 * 
 * @returns an array of all teams in the metatable
 * @description returns all the teams in the table in an array format
 * @todo 
 */
module.exports.loadAllData = async function loadAllData() {
  try {
    await client.connect()
    const db = client.db('team_meta')
    const metatable = db.collection('metatable')

    const teams = await metatable.find().toArray()
    console.log(teams)
    return teams
  } catch(e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

/**
 * 
 * @param {string} teamname 
 * @param {list} memberNames 
 * @param {string} scrumMaster
 * @description inserts a new team inside the database with a list of members, duplicate errors are handled here as well. 
 */
module.exports.insertMetaData = async function insertMetaData(teamname, memberNames, scrumMaster) {

  try {
    await client.connect()
    const db = client.db('team_meta')
    const metatable = db.collection('metatable')
    const query = {team_name: teamname}
    if(!(await metatable.findOne(query))) {
      if(memberNames.includes(scrumMaster)){
        const numMembers = memberNames.length
        const newFile = {
          "team_name": teamname.toLowerCase().trim(),
          "member_names": memberNames,
          "total_members": numMembers,
          "scrum_master": scrumMaster.toLowerCase().trim()
        }
        const response = await metatable.insertOne(newFile)
        console.log(`${newFile.team_name} created`)
      } else {
        console.error(`${scrumMaster} not found on ${teamname}`)
      }
    } else {
      console.error(`${teamname} already exists`)
    }
  } catch(e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

/**
 * 
 * @param {string} teamname 
 * @description this will delete the file of the teamname specified
 */
module.exports.deleteMetaData = async function deleteMetaData(teamname) {
  try {
    await client.connect()
    const db = client.db('team_meta')
    const metatable = db.collection('metatable')
    const query = {team_name: teamname}

    const response = await metatable.deleteOne(query)
    console.log(`${response.team_name} deleted`)
  } catch (e) {
    console.error(e)
  } finally {
    client.close()
  }
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