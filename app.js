// Referenciar os elementos
const botao = document.querySelector('#app form button')
const cep = document.querySelector('#app form input')
const conteudo = document.querySelector('#app main')

// Ouvir o evento do click e passar a função como argumento
botao.addEventListener('click', correr)

function correr(evento) {
    // Prevenir o comportamento padrão do formulário
    evento.preventDefault()

    // Retirar os caracteres exedentes
    let cepFormat = cep.value            
    cepFormat = cepFormat.replaceAll('.','')
    cepFormat = cepFormat.replaceAll(' ','').trim()
    

    // Realizar a requisição da api
    axios.get('https://viacep.com.br/ws/' + cepFormat + '/json/')    
    .then(function (responta) {
        // CEP inválido
        if (responta.data.erro) {
            throw new Error ()
        }

        // Esvaziar o conteúdo
        conteudo.innerHTML = ''

        //Definir a cor do endereço
        const cor = '#4091dd'

        // Apresentar os dados retornados pela api
        criarLinha(`${responta.data.localidade} / ${responta.data.uf}`, cor)        
        criarLinha(responta.data.bairro, cor)
        criarLinha(responta.data.logradouro, cor)
    })
    .catch(function() {
        conteudo.innerHTML = ''       
        criarLinha('Ops, algo deu errado!','#E83151')
    })
    .finally(function() {
        // Limpar o campo
        cep.value = null;
    })
}
// Criar o parágrafo que irá conter os dados
function criarLinha(informacao, cor) {
    const linha = document.createElement('p')
    const texto = document.createTextNode(informacao)

    linha.style.color = cor

    linha.appendChild(texto)
    conteudo.appendChild(linha)    
}