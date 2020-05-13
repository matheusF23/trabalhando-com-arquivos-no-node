const readXlsxFile = require('read-excel-file/node');

const tableName = 'PESSOA';
const pathToFile = `${__dirname}/data_exemple.xlsx`;

readXlsxFile(pathToFile)
  .then(rows => {
    initInsert(rows[0]);
    rows.slice(1)
      .forEach((row, index) => {
        let valuesToInsert = getValuesToInsert(row);
        valuesToInsert = index != rows.length - 2 ? `${valuesToInsert},` : `${valuesToInsert};`
        console.log(`${valuesToInsert}`)
      });
  });

const initInsert = header => {
  const insertInit = `INSERT INTO ${tableName} ${getValuesToInsert(header, true)} VALUES`;
  console.log(insertInit);
}

const getValuesToInsert = (row, isHeader) => {
  let dataToInsert = '(';
  for (let index = 0; index < row.length; index++) {
    const column = row[index];

    dataToInsert = `${dataToInsert}${isHeader ? column : `'${column}'`}`;
    dataToInsert = index != row.length - 1 ? `${dataToInsert},` : `${dataToInsert})`;
  }
  return dataToInsert;
} 
