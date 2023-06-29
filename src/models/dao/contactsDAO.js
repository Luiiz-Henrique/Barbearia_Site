class ContactsDAO {

  static async findContactsByEmail(client, email){
      try{
          await client.connect()
          const result = await client
              .db('BD_Barbearia')
              .collection('cadastro')
              .find({email: email})
          if (result) {
              return await result.toArray();
          } else {
              return false;
          }
      } finally {
          await client.close()
      };
  }

  static async insertContact(client, contact) {
    try {
      await client.connect()
      const result = await client
        .db('BD_Barbearia')
        .collection('cadastro')
        .insertOne(contact);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async login(client, email, password){
      try {
          await client.connect()
          const result = await client
              .db('BD_Barbearia')
              .collection('cadastro')
              .findOne({email: email, password: password})
          if (result) {
              return result;
          } else {
              return false;
          }
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
    }
  }

}

module.exports = ContactsDAO;