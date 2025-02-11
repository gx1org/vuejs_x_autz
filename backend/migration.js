require('dotenv').config()

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

async function main() {
  const hasTable = await knex.schema.hasTable('users')
  if (!hasTable) {
    await knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('name');
      table.string('kunber_id');
      table.string('email');
      table.string('password');
      table.string('phone');
      table.string('address');
      table.string('dob');
      table.string('gender');
      table.timestamps();
    });
  }

  const demo = await knex.table('users').where('email', 'demo@example.com').first()
  if (!demo) {
     await knex.table('users').insert({
      name: 'User Demo',
      email: 'demo@example.com',
      password: 'demo123',
      phone: '+628123456789',
      address: 'Jl. Jendral Soedirman, Jakarta, Indonesia',
      dob: '1990-01-31',
      gender: 'male',
    })
  }
  process.exit()
}

main()