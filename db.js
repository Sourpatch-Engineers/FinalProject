
const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://app_user:ibn9j5dxCFfiuBka@cluster0.ohmbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri)
/**
 * function will handle the connection with mongodb
 */
async function main() {


  try {
    await client.connect()

    //await listDB(client)
    await loadMetaData('sourpatch engineers')
  } catch(e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

main()


async function listDB() {
  const dbList = await client.db().admin().listDatabases()
  console.log("DB: ")
  dbList.databases.forEach( db => {
    console.log(`- ${db.name}`)
  })
}

/**
 * 
 * @param {string} teamname the team you are searching for located in the database
 * @returns the team bson file within the db using the query of teamname
 * @todo will be ids in the future rather than names
 */
async function loadMetaData(teamname) {
  const db = client.db('team_meta')
  const metatable = db.collection('metatable')

  const query = {team_name: teamname}
  const team = await metatable.findOne(query)
  return team
}