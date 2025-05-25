# C-Medic

**C-Medic** é um sistema de gestão para clínicas médicas e consultórios, desenvolvido em **Node.js**, com o objetivo de organizar agendamentos, exames, pacientes, materiais e estoques de forma eficiente e automatizada.

---

## 📚 Sumário

- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [Requisitos Funcionais](#-requisitos-funcionais)
- [Requisitos Não Funcionais](#-requisitos-não-funcionais)
- [Diagrama BPMN do Processo de Agendamento](#-diagrama-bpmn-do-processo-de-agendamento)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar (Sugestão)](#-como-executar-sugestão)
- [Próximos Passos (Sugestão)](#-próximos-passos-sugestão)

---

## 📌 Funcionalidades Implementadas

-   **Gestão de Pacientes**
    -   Cadastro, atualização, listagem e remoção de pacientes com dados pessoais.
-   **Gestão de Exames**
    -   Cadastro, atualização, listagem e remoção de exames com código, tipo, valor e responsável pela criação.
-   **Gestão de Materiais**
    -   Controle de insumos médicos como medicamentos, EPIs, materiais de escritório, hospitalares, etc.
    -   Gerenciamento de código, tipo, valor, quantidade, data de vencimento e responsável pela criação.
-   **Agenda e Horários**
    -   Geração de agenda para datas específicas.
    -   Criação de horários disponíveis dentro de uma agenda, com intervalos configuráveis.
    -   Adição de horários de encaixe.
-   **Agendamento**
    -   Vinculação de agendamentos a pacientes, exames e horários específicos.
    -   Gerenciamento do status dos horários: `Aberto`, `Marcado`, `Cancelado`.
    -   **Agendamento Múltiplo (Estilo Carrinho):** Permite ao atendente selecionar e agendar vários horários para um mesmo paciente e exame em uma única operação.
    -   **Verificação de Duplicidade de Agendamento para o Paciente:** O sistema impede que o mesmo paciente seja agendado para o mesmo horário se já existir um agendamento ativo (não cancelado) para ele nesse slot.
    -   **Verificação de Exame Recente:** Antes de finalizar um novo agendamento, o sistema checa se o paciente já realizou o mesmo exame nos últimos 6 meses (e se este não foi cancelado), ajudando a evitar repetições desnecessárias.
    -   **Confirmação e Cancelamento de Agendamentos:**
        -   Possibilidade de atualizar o status de um agendamento (e, consequentemente, do horário associado) para `Marcado` ou `Cancelado`.
        -   Ao cancelar um agendamento, uma observação sobre o cancelamento é registrada.
        -   Ao tentar remarcar um horário que foi previamente cancelado, o sistema verifica se o slot já não foi preenchido por outro agendamento.
    -   **Listagem Detalhada de Agendamentos do Paciente:** A consulta de agendamentos de um paciente agora retorna informações completas, incluindo nome do paciente, descrição do exame, data, hora e o status atual do horário.

---

## 📋 Requisitos Funcionais

**RF01:** O sistema deve permitir o cadastro, consulta, atualização e exclusão de Pacientes.
**RF02:** O sistema deve permitir o cadastro, consulta, atualização e exclusão de Exames.
**RF03:** O sistema deve permitir o cadastro, consulta, atualização e exclusão de Materiais.
**RF04:** O sistema deve permitir a geração de Agendas (com dias e horários de atendimento).
**RF05:** O sistema deve permitir a criação de horários de encaixe na agenda.
**RF06:** O sistema deve permitir o agendamento de um ou mais horários para um Paciente para um Exame específico.
**RF07:** O sistema deve impedir que um Paciente seja agendado para um horário que já está ocupado por outro agendamento ativo.
**RF08:** O sistema deve impedir que um Paciente seja agendado para o mesmo horário mais de uma vez, a menos que o agendamento anterior esteja cancelado.
**RF09:** O sistema deve alertar ou impedir o agendamento de um Exame para um Paciente se este já o realizou recentemente (últimos 6 meses) e o agendamento não foi cancelado.
**RF10:** O sistema deve permitir a alteração do status de um agendamento (e do horário associado) para "Marcado" ou "Cancelado".
**RF11:** O sistema deve permitir a visualização dos agendamentos de um Paciente, incluindo detalhes do paciente, exame, data, hora e status.
**RF12:** (Futuro) O sistema deve permitir a autenticação de usuários (atendentes, administradores).

---

## ⚙️ Requisitos Não Funcionais

**RNF01:** O sistema deve ser desenvolvido utilizando Node.js e Express.js.
**RNF02:** O sistema deve utilizar Sequelize como ORM.
**RNF03:** O sistema deve utilizar MySQL como banco de dados.
**RNF04:** A API deve ser RESTful e retornar dados no formato JSON.
**RNF05:** O tempo de resposta para requisições comuns da API deve ser inferior a 2 segundos sob condições normais de carga.
**RNF06:** Informações sensíveis (como senhas de banco de dados) devem ser gerenciadas através de variáveis de ambiente em produção.
**RNF07:** O código-fonte deve ser modular e bem organizado para facilitar a manutenção e escalabilidade.
**RNF08:** (Futuro) O sistema deve implementar logs de auditoria para ações críticas.
**RNF09:** (Futuro) O sistema deve ser seguro contra vulnerabilidades comuns da web (ex: SQL Injection - já mitigado pelo Sequelize, XSS).

---

## 🌊 Diagrama BPMN do Processo de Agendamento


---

## 🛠️ Tecnologias Utilizadas

-   **Node.js** com **Express** para o backend e construção da API.
-   **Sequelize** como ORM (Object-Relational Mapper) para a interação com o banco de dados.
-   **MySQL** como sistema de gerenciamento de banco de dados relacional.
-   **XAMPP** (ou Docker, ou instalação direta do MySQL) para o ambiente de banco de dados local.
-   **(Futuro) JSON Web Token (JWT)** para autenticação e autorização.

---

## 📁 Estrutura do Projeto

```bash
C-Medic/
├── src/
│   ├── config/           # Configurações de banco de dados
│   ├── controllers/      # Responsáveis por receber as requisições HTTP, chamar os serviços e enviar respostas
│   ├── models/           # Definição das tabelas e seus relacionamentos (Sequelize)
│   ├── routes/           # Definição dos endpoints (URLs) da API
│   ├── services/         # Camada contendo a lógica de negócio da aplicação
├── tests/                # Arquivos de teste (ex: .http para REST Client, ou testes automatizados)
├── .gitignore
├── app.js                # Arquivo principal de configuração e inicialização do Express (ou server.js/index.js)
├── package-lock.json
├── package.json
└── README.md             # Esta documentação
```
