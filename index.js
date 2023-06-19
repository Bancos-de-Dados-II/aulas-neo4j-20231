var neo4j = require('neo4j-driver');

var driver = neo4j.driver(
    'neo4j://localhost',
    neo4j.auth.basic('neo4j', 'neo4j123*')
);

// salvar();

async function salvar(){
    var session = driver.session();

    await session.run('CREATE (:Pessoa{nome:$nome, idade:$idade})',{
        nome:'Maria', idade:21
    }).then(result => console.log(result.summary.counters._stats.nodesCreated))
    .catch(e => console.log(e));

    session.close();
    driver.close();
}

// buscar();

async function buscar(){
    var session = driver.session();

    await session.run('MATCH (p:Pessoa) RETURN p.nome as nome, p.idade as idade').then(result => console.log(result.records));

    session.close();
    driver.close();
}

// criarRelacionamento('Maria', 'Pedro');

async function criarRelacionamento(nome1, nome2){
    var session = driver.session();

    await session.run('MATCH (p1:Pessoa{nome:$nome1}) OPTIONAL MATCH (p2:Pessoa{nome:$nome2}) CREATE (p1)-[:AMIGO]->(p2)',{
        nome1: nome1,
        nome2: nome2
    }).then(result => console.log(result.summary.counters._stats.relationshipsCreated));

    session.close();
    driver.close();
}

listarAmigos('Maria');

async function listarAmigos(nome){
    var session = driver.session();

    await session.run('MATCH (p:Pessoa)-[:AMIGO]->(p2:Pessoa) WHERE p.nome = $nome RETURN p2.nome as amigos',{
        nome:nome
    }).then(result => console.log(result.records));

    session.close();
    driver.close();
}