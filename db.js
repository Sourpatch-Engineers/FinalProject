
const { MongoClient } = require('mongodb')


async function main() {
  const uri = "mongodb+srv://app_user:ibn9j5dxCFfiuBka@cluster0.ohmbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  const client = new MongoClient(uri)

  try {
    await client.connect()

    await listDB(client)
  } catch(e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

main().catch(console.error)


async function listDB(client) {
  const dbList = await client.db().admin().listDatabases()
  console.log("DB: ")
  dbList.databases.forEach( db => {
    console.log(`- ${db.name}`)
  })
}