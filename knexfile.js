// Update with your config settings.

module.exports = {


  
  development: {
    client: 'postgresql',
    connection: {
      database: 'dr_salins',
      user:     'dr_salins',
      password: 'cheese'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'dr_salins',
      user:     'dr_salins',
      password: 'cheese'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'dr_salins',
      user:     'dr_salins',
      password: 'cheese'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
