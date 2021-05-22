console.log("=== AGENDA ===");

(function () {
    console.log("Starting...");

    // User Interface (UI)
    const ui = {
        fields: document.querySelectorAll("input"), // ui.fields (todos os fiels com tag input)
        buttonAdd: document.querySelector(".pure-button-primary"), // ui.buttonAdd
        contactList: document.querySelector(".pure-table") // ui.contactList
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

            if (field.value !== "") {
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

    const addContact = function() {};

    const getContact = function() {};

    const clearFields = function() {};

    const removeContact = function() {};

    const editContact = function() {};

    // Binding Events (ligação dos eventos)

    /* ui.buttonAdd = botão adicionar; onclick = ao clicar; 
    validateFields = ação que vai executar -> validateFields(MouseEvent);
    clicar no adicionar gera um evento de mouse */

    ui.buttonAdd.onclick = validateFields;


})();