//Módulo dotenv (variaveis do sistema)
require('dotenv').config({ path: '../.env' })

//Modulo para monitorar a pasta com arquivo da programação
// const fs = require('fs')

//Modulo para leitura do xlsx
const xlsx = require('node-xlsx')

//Modulo para trabalhar com datas
const moment = require('moment')

//Converter datas excel para js
const { getJsDateFromExcel } = require('excel-date-to-js')

//Configuração do banco e do knex (query builder)
const knex = require('./db')

//Caminho do arquivo a xlsx a ser lido
const filePath = `${__dirname}/Programacao.xlsx`

//Função que irá converter as datas do excel para o formato YYYYMMDD
function excelDateToJSDate(date) {
  let data = getJsDateFromExcel(date)
  return moment(data).utc().format("YYYYMMDD")
}

//Função para retornar apenas valores existentes do .map
const identity = x => x

//Usaremos esta função do node (fs.watchFile), para ficar monitorando alterações no arquivo, assim toda vez que algo
//for alterado e salvo, azs funções serão executadas e os dados inseridos no banco

console.log(`Programação Alterada em ${new Date()}`)

//Lendo a planilha
const plan = xlsx.parse(filePath)

//Trabalhando as informações para enviar ao banco
const finalData = plan[0].data
  .map(([_, COD_FAMILIA, excelDate]) => {
    const DT_PROG = excelDateToJSDate(excelDate)

    if (DT_PROG !== 'Invalid date') {
      return { COD_FAMILIA, DT_PROG }
    }
  })
  .filter(identity)

// dentro do knex, a função batchInsert é indicada para inserir uma
// grande quantidade de dados no banco
// PROGRAMACAO é o nome da tabela no banco onde os dados serão inseridos
knex.batchInsert('PROGRAMACAO', finalData)
  .then(function (msg) {
    console.log('Operation Successful Completed')
  })
  .catch(function (error) {
    console.log(error)
  })
