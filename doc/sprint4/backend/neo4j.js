const neo4j = require('neo4j-driver');

const uri = 'neo4j+s://fddf35fa.databases.neo4j.io';
const user = 'neo4j';
const password = 'HfZENvbpnjg6Qas_DO36OD4r20nO0u7bso2EY797X2Q';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

module.exports = {
    driver,
    getSession: () => driver.session()
};
  