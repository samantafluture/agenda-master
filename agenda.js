console.log("=== AGENDA ===");

(function () {
    console.log("Starting...");

    // indicar qual o endpoint onde vc vai disparar essa comunicação; onde está o backend
    // configuração
    const endpoint = "http://localhost:7000/contacts";

    // User Interface (UI)
    const ui = {
        fields: document.querySelectorAll("input"), // ui.fields (todos os fiels com tag input)
        buttonAdd: document.querySelector(".pure-button-primary"), // ui.buttonAdd
        contactList: document.querySelector(".pure-table"), // ui.contactList
        formTitle: document.querySelector(".message-error")
    };

    console.log(ui);

    // Actions (funcionalidades)

    /* e.preventDefault(); -> resetando o comportamento padrão do html form;
    sendo submetido e atualizando a pág, dando conflito com js
    e -> representa um evento; convenção de código */

    const validateFields = function(e) { 
        e.preventDefault(); 
        console.log(ui.fields); // ex: (ui.fields[0]) acessa o campo do name, o primeiro
        let errors = 0;
        let data = {};

        ui.fields.forEach(function(field) { // field -> dá nome ao primeiro argumento
            //console.log(arguments[0]); // para ver se tá chamando algo
            console.log(field.value); // retorna os dados que adicionei

            /* validação visual -> coloca e tira a classe error do css */

            if (field.value.trim() !== "") { // .tim() para limpar os espaços dentro da String
                console.log(field.id, "Preenchido");
                field.classList.remove("error"); // retira do css a classe de erro se o field tá preenchido!
                data[field.id] = field.value; // conforme foi passando, foi construindo um objeto com os dados válidos
            } else {
                console.log(field.id, "Vazio");
                field.classList.add("error"); // adiciona a classe css de erro no field
                errors++;
            }

        });

        if (errors == 0) {
            addContact(data); // sem erros, então adiciona o contato
        } else {
            document.querySelector(".error").focus(); // dá foco no primeiro campo com erro, para a pessoa preencher
        }

        console.log("errors", errors);
        console.log("data", data);

    };

    const addContact = function(contact) {
        // console.log(arguments[0]);
        console.log(contact); // dou nome ao argumento para pegar ele; é um parâmetro que fizemos

        // passar atributos no objeto; traçar uma estratégia para falar com o endpoint
        // objeto de configuração
        const config = {
            method: "POST", // estratégia de comunicação
            body: JSON.stringify(contact),   // o que vc quer gravar, o corpo
            headers: new Headers({  // o que precisa para identificar o que estou enviando
                "Content-type": "application/json" // tipo de dado que estou mandando
            }) 
        };

        // 1º parâmetro: endpoint, onde quero fazer a requisição
        // 2º parâmetro: configuração da comunicação
        // fetch(endpoint, config);
        fetch(endpoint, config)
            // encadamento de métodos da promise api & fetch api -> tratamento de erro e sucesso
            // passa as funções callback
            .then(addContactSuccess)
            .catch(addContactError);
            // .finally() 
    };

    const showMessage = function(msg, action) {
        ui.formTitle.textContent = msg;
        ui.formTitle.classList[action]("message-error"); // add ou remover classe error do css 
    };

    // Success + Erro => callbacks; um ou o outro vão ser executados
    const addContactSuccess = function() {
        showMessage("Agenda", "remove");
        clearFields();
        getContacts();
    };

    const addContactError = function() {
        showMessage("Ocorreu erro ao adicionar dados!", "add");
    };

    const getContacts = function() {
        const config = {
            method: "GET",
            headers: new Headers({
                "Content-type": "application/json"
            })
        };
        
        fetch(endpoint, config)
            .then(getContactsSuccess) // trata na 1ª função
                .then(getDataSuccess) // pega os dados na 2ª -> isso é só no caso do GET (são duas vezes)
                .catch(getDataError)
            .catch(getContactsError);
    };

    const getContactsSuccess = function(response) {
       // console.log(arguments[0]); // para descobrir o que está chegando!
       showMessage("Agenda", "remove");
       return response.json(); // mesmo objeto que acima -> precisa converter pra json 
    };

    const getContactsError = function() {
        showMessage("Ocorreu erro ao recuperar os dados!", "add");
    };

    const getDataSuccess = function(contacts) {
        console.table(contacts); // array com os objetos que salvamos

        // recuperar os dados => executar esta função para cada um dos contatos cadastrados
        // map() => itera e retorna os dados formatados / transformados (permite q vc faça uma transformação); retorna um novo array!
        const htmlTable = contacts.map(function(contact) {
            console.log(contact);

            // template string (html entre ``)
            // posso colocar código js ${}
            const lineTable = 
                `<tr>
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.email}</td>
                    <td><a href="#">Excluir</a> | <a href="#">Editar</a></td>
                </tr>`
           console.log(lineTable);
           return lineTable;
        }).join("");

        console.log(htmlTable);
        ui.contactList.innerHTML = htmlTable;
    };

    const getDataError = function() {
        showMessage("Ocorreu erro ao converter os dados!", "add");
    };

    const clearFields = function() {
        ui.fields.forEach(function(field) {
            field.value = "";
        });
    };

    const removeContact = function() {};

    const editContact = function() {};

    // Binding Events (ligação dos eventos)

    /* ui.buttonAdd = botão adicionar; onclick = ao clicar; 
    validateFields = ação que vai executar -> validateFields(MouseEvent);
    clicar no adicionar gera um evento de mouse */

    ui.buttonAdd.onclick = validateFields;

    // Initialize 

    /* funções para serem executas assim que a página carrega */

    getContacts();


})();