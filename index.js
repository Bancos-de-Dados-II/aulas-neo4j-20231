var neo4j = require('neo4j-driver');

var driver = neo4j.driver(
    'neo4j://localhost',
    neo4j.auth.basic('neo4j', 'neo4j123*')
);

salvar();

async function salvar(){
    var session = driver.session();

    await session.run('CREATE (:Pessoa{nome:$nome, idade:$idade})',{
        nome:'Maria', idade:21
    }).then(result => console.log(result.summary.counters._stats.nodesCreated))
    .catch(e => console.log(e));

    session.close();
    driver.close();
}