class ContactsDAO {

    static async insertContact(client, contact) {
      try {
        const result = await client
          .db('BD_Barbearia')
          .collection('cadastro')
          .insertOne(contact);
        return result;
      } catch (err) {
        console.log(err);
      } finally {
        await client.close()
      }
    }
  
    static async deleteContactByName(client, name) {
      try {
        const result = await client
          .db('BD_Barbearia')
          .collection('cadastro')
          .deleteOne({nome: name});
        return result;
      } catch (err) {
        console.log(err);
      } finally {
        await client.close()
      }
    }
  
    static async listContacts(client) {
      try {
        const results = await client
          .db('BD_Barbearia')
          .collection('cadastro')
          .find({})
          .project({_id : 0});
        return await results.toArray();
      } catch (err) {
        console.log(err);
      } finally {
        await client.close()
      }
    }
  
  }
  
  module.exports = ContactsDAO;