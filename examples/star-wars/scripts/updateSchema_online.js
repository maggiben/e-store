import babelRelayPlugin from 'babel-relay-plugin';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

var response = axios({
  url: 'http://localhost:7070/graphql', 
  method: 'GET',
  params: {
    query: introspectionQuery
  }
})
.then(response => {
  let schema = response.data;
  fs.writeFileSync(
    path.join(__dirname, '../data/schema.json'),
    JSON.stringify(schema.data, null, 2)
  );
})
.catch(error => {
  console.log(error);
});