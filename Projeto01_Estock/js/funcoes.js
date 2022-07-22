//-----------------------------------------------------------------------------------------------------------
// Função: validarProduto(idNomeProduto, idCodProduto, idUniProduto, idCustProduto, idQtidadeProduto, idModalProduto)
// Verifica se os campos estão preenchidos corretamente
// OBS: Se faltar alguma informação aparecerá uma mensagem de erro. Em caso de 
// sucesso (todas as informações preenchidas), chama a função cadastrarProduto(...)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function validarProduto(idNomeProduto, idCodProduto, idUniProduto, idCustProduto, idQtidadeProduto, idModalProduto) {
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let unidade = document.getElementById(idUniProduto).value;
    let custo = document.getElementById(idCustProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;
    let modo = document.getElementById(idModalProduto).value;

    if (nome == "")
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    else if (codigo == "")
        alert("Número da OF não pode estar em branco. Favor preenchê-lo!");
    else if (unidade == "")
        alert("Unidade do produto não pode estar em branco. Favor preenchê-lo!");
    else if (custo == "")
        alert("Custo do produto não pode estar em branco. Favor preenchê-lo!");
    else if (qtidade == "")
        alert("Quantidade do produto não pode estar em branco. Favor preenchê-lo!");
    else cadastrarProduto(nome, codigo, unidade, parseFloat(custo), parseFloat(qtidade), modo);
}
//-----------------------------------------------------------------------------------------------------------
// Função: cadastrarProduto(produto, codig, unid, cust, qtidade, modal)
// Cadastra um novo produto (nome, código, unidade, custo, quantidade, modo) no estoque
// Parâmetros:
// OBS: Apos cadastrar o novo insumo, atualiza a quantidade de itens registrados, ou seja, chama 
// a função atualizarTotalEstoque()
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function cadastrarProduto(produto, codig, unid, cust, qtidade, modal) {
    let novoProduto = {nome:produto, codigo:codig, unidade:unid, custo:cust, quantidade:qtidade, modo:modal};

    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso "+qtidade+" "+unid+" do insumo "+produto+"!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

//-----------------------------------------------------------------------------------------------------------
// Função: atualizarTotalEstoque(idCampo)
// Incrementa a quantidade de insumos cadastrados no estoque
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de insumos;
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
}
//-----------------------------------------------------------------------------------------------------------
// Função: carregarTotalEstoque(idCampo)
// Incrementa a quantidade de insumos cadastrados no estoque
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de insumos;
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function carregarTotalEstoque(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

//-----------------------------------------------------------------------------------------------------------
// Exibe todos os insumos cadastrados
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function listarEstoque() {
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Estoque:</h1>")
        if (produtos == null)
            document.write("<h3>Ainda não há nenhum item no estoque</h3>");
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul>");
                document.write("<li>Insumo: "+produto.nome+"</li>");
                document.write("<li>Número OF: "+produto.codigo+"</li>");
                document.write("<li>Unidade: "+produto.unidade+"</li>");
                document.write("<li>Custo unitário: "+produto.custo+"</li>");
                document.write("<li>Quantidade: "+produto.quantidade+"</li>");
                document.write("<li>Modalidade: "+produto.modo+"</li>");
                document.write("</ul>");
            });
        }
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");    
}