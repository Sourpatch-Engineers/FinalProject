
const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://app_user:ibn9j5dxCFfiuBka@cluster0.ohmbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri)

async function listDB() {
  try {
    await client.connect()
    const dbList = await client.db().admin().listDatabases()
    console.log("DB: ")
    dbList.databases.forEach( db => {
      console.log(`- ${db.name}`)
    })
  } catch(e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

/**
 * 
 * @param {string} teamname the team you are searching for located in the database
 * @returns the team bson file within the db using the query of teamname
 * @todo will be ids in the future rather than names
 */
module.exports.loadMetaData = async function loadMetaData(teamname) {
  try {
    await client.connect()
    const db = client.db('team_meta')
    const metatable = db.collection('metatable')
  
    const query = {team_name: teamname}
    const team = await metatable.findOne(query)
    console.log(team)
    return team
  } catch(e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

module.exports.insertMetaData = async function insertMetaData(teamname, memberNames) {

  try {
    await client.connect()
    const db = client.db('team_meta')
    const metatable = db.collection('metatable')
    const query = {team_name: teamname}
    if(!(await metatable.findOne(query))) {
      const numMembers = memberNames.length
      const newFile = {
        "team_name": teamname,
        "member_names": memberNames,
        "total_members": numMembers
      }
      const response = await metatable.insertOne(newFile)
    } else {
      console.log("THAT TEAM ALREADY EXISTS")
    }
  } catch(e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

