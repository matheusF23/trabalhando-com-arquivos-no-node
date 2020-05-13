//Modulo para leitura do xlsx
const xlsx = require('node-xlsx')

//Caminho do arquivo a xlsx a ser lido
const filePath = `${__dirname}/BNCC_Ensino_Fundamental.xlsx`

//Lendo a planilha
const plan = xlsx.parse(filePath)

// let array = []
// for (let i = 0; i < 9; i++) {
//   if (plan[i].name === 'Língua Portuguesa' ||
//     plan[i].name === 'Língua Inglesa') {
//     const listOfSubjects = (plan[i].data
//       .map(([ ,ANO_FAIXA, , ,OBJETOS_DE_CONHECIMENTO,HABILIDADES]) => {
//         return {
//           ANO_FAIXA, OBJETOS_DE_CONHECIMENTO, HABILIDADES
//         }
//       })
//       .filter((value) => value.ANO_FAIXA !== undefined &&
//         value.ANO_FAIXA !== 'ANO/FAIXA'))
//     let arrayOfSubjects = {}
//     arrayOfSubjects[plan[i].name] = listOfSubjects
//     array.push(arrayOfSubjects) 
//   } else {
//     const listOfSubjects = (plan[i].data
//       .map(([,ANO_FAIXA, ,OBJETOS_DE_CONHECIMENTO,HABILIDADES]) => {
//         return {
//           ANO_FAIXA, OBJETOS_DE_CONHECIMENTO, HABILIDADES
//         }
//       })
//       .filter((value) => value.ANO_FAIXA !== undefined &&
//         value.ANO_FAIXA !== 'ANO/FAIXA'))
//     let arrayOfSubjects = {}
//     arrayOfSubjects[plan[i].name] = listOfSubjects
//     array.push(arrayOfSubjects)
//   }
// }

// console.log(array[0])

const array = []
for (let i = 0; i < 9; i++) {
  if (plan[i].name === 'Língua Portuguesa' ||
    plan[i].name === 'Língua Inglesa') {
    const listOfSubjects = (plan[i].data
      .map(([, , , , OBJETOS_DE_CONHECIMENTO, HABILIDADES]) => {

        return {
          OBJETOS_DE_CONHECIMENTO, HABILIDADES
        }
      })
      .filter((value) => value.OBJETOS_DE_CONHECIMENTO !== undefined &&
        value.HABILIDADES !== 'HABILIDADES'))
    const arrayOfSubjects = { COMPONENTE: plan[i].name, listOfSubjects }
    array.push(arrayOfSubjects)
  } else {
    const listOfSubjects = (plan[i].data
      .map(([, , , OBJETOS_DE_CONHECIMENTO, HABILIDADES]) => {

        return {
          OBJETOS_DE_CONHECIMENTO, HABILIDADES
        }
      })
      .filter((value) => value.OBJETOS_DE_CONHECIMENTO !== undefined &&
        value.HABILIDADES !== 'HABILIDADES'))
    const arrayOfSubjects = { COMPONENTE: plan[i].name, listOfSubjects }
    array.push(arrayOfSubjects)
  }
}

const response = []
for (subject of array) {
  const object = new Set()
  const objectives = new Set()
  for (item of subject.listOfSubjects) {
    if (objectives.has(item.OBJETOS_DE_CONHECIMENTO)) {
      object.forEach(obj => {
        if (obj.OBJETOS_DE_CONHECIMENTO === item.OBJETOS_DE_CONHECIMENTO) {
          obj.HABILIDADES.push(item.HABILIDADES)
        }
      })
    } else {
      object.add({
        OBJETOS_DE_CONHECIMENTO: item.OBJETOS_DE_CONHECIMENTO,
        HABILIDADES: [item.HABILIDADES]
      })
      objectives.add(item.OBJETOS_DE_CONHECIMENTO)
    }
  }
  response.push({ COMPONENTE: subject.COMPONENTE, data: [...object] })
}

console.log(response)

// console.log(array[1])
