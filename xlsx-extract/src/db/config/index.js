module.exports = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'docker',
    database: 'teste_xlsx',
    connectionTimeout: 30000,
    requestTimeout: 30000
  }
}