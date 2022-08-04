//-----------------------------------------------------------------------------------------------------------
// Verificando o preenchimento dos campos
// Se não preencher algum campo aparecerá uma mensagem de erro - alert
// Se preenchido corretamente, chama a função cadastrar 
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------

//>>>> Codando
/*
getElementById = retorna um elemento que representa o elemento cuja id corresponde à string.
id = elemento a ser localizado.
*/
function validarProduto(idNomeProduto, idCodProduto, idUniProduto, idCustProduto, idQtidadeProduto, idModalProduto) {
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let unidade = document.getElementById(idUniProduto).value;
    let custo = document.getElementById(idCustProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;
    let modo = document.getElementById(idModalProduto).value;
/*
alert = instrui o navegador a exibir uma caixa de diálogo com uma mensagem
        e espera até que o usuário descarte a caixa de diálogo.
*/
    if (nome == "")
        alert("Insira uma descrição para o insumo!");
    else if (codigo == "")
        alert("Você precisa informar o número da OF!");
    else if (unidade == "")
        alert("Não esqueça a unidade de medida!");
    else if (custo == "")
        alert("O campo custo não pode ficar vazio!");
    else if (qtidade == "")
        alert("Qual a quantidade do insumo?");
    else cadastrarProduto(nome, codigo, unidade, parseFloat(custo), parseFloat(qtidade), modo);
}
//-----------------------------------------------------------------------------------------------------------
// Cadastro de novos insumos no estoque
// Cadastra o novo insumo, atualiza a quantidade de itens registrados - atualizarTotalEstoque()
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function cadastrarProduto(produto, codig, unid, cust, qtidade, modal) {
    let novoProduto = {nome:produto, codigo:codig, unidade:unid, custo:cust, quantidade:qtidade, modo:modal};
/*
typeof = operador retorna uma string indicando o tipo de operando não avaliado
        retorna um objeto.
        null = objeto.
        Undefined = indefinido.      
Storage = interface da API de armazenamento da web que fornece acesso a uma sessão local
        de um domínio específico.
JSON.parse = método que analisa uma string JSON, construindo o valor ou objeto JS descrito pela string.
push = método que adiciona 1 ou mais elementos ao final de um array e retorna o novo comprimento pela string.
localStorage = dados armazenados e salvos na sessão do navegador sem tempo de expiração.
getItem = método da Storage, ao passar um nome de chave, retornará o valor dessa chave,ou NULL se a chave não existir.
setItem = método da Storage, quando passado um nome e valor de chave, adicionará essa chave ao Storage objeto fornecido
        ou atualizará o valor dessa chave se ela já existir.      
JSON.stringrify = método converte um objeto ou valor JS em uma string JSON.
location.reload = método recarrega a URL atual, como o botão atualizar.
*/
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum insumo foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo insumo
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso "+qtidade+" "+unid+" do insumo "+produto+"!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}
//-----------------------------------------------------------------------------------------------------------
// Incrementa a quantidade de insumos cadastrados no estoque
// idCampo: identificador do campo que contem a quantidade de insumos;
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
/*
innerHTML = define ou retorna o conteúdo HTML de um elemento.
*/
function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
}
//-----------------------------------------------------------------------------------------------------------
// Incrementa a quantidade de insumos cadastrados no estoque
// idCampo: identificador do campo que contem a quantidade de insumos;
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
/*
document.write = método grava uma string de texto em um fluxo de documento aberto "automaticamente" por document.open.
forEach = método executa uma função fornecida uma vez para cada elemento da matriz.
*/
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