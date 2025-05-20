# C-Medic

**C-Medic** é um sistema de gestão para clínicas médicas e consultórios, desenvolvido em **Node.js**, com o objetivo de organizar agendamentos, exames, pacientes, materiais e estoques de forma eficiente e automatizada.

---

## 📌 Funcionalidades implementadas

- **Gestão de Pacientes**
  - Cadastro e listagem de pacientes com dados pessoais.

- **Gestão de Exames**
  - Cadastro de exames com código, tipo, valor e responsável.

- **Gestão de Materiais**
  - Controle de insumos médicos como medicamentos, EPIs, hospitalares, etc.
  - Gerenciamento de código, tipo, valor, quantidade e validade dos materiais.

- **Agendamento**
  - Agendamentos vinculados a pacientes, exames, horários e dias da agenda.
  - Status dos horários: `Aberto`, `Marcado`, `Cancelado`.

- **Agenda e Horários**
  - Criação de agendas por dia e geração de horários vinculados a ela.
  - Associação dos horários a exames agendados.

---

## ⚙️ Tecnologias utilizadas

- **Node.js** com **Express**
- **Sequelize** (ORM)
- **MySQL** (banco de dados relacional)
- **JWT (JSON Web Token)** - [em breve]
- **XAMPP** para ambiente local com MySQL

---

## 📁 Estrutura do projeto

```bash
C-Medic/
├── src/
│   ├── config/              # Configurações de banco de dados
│   ├── controllers/         # Regras de negócio das rotas
│   ├── models/              # Definição das tabelas e relacionamentos Sequelize
│   ├── routes/              # Endpoints da API
│   ├── services/            # Lógica de aplicação (em progresso)
├── tests/                   # Arquivos de teste (incluindo arquivos .http do REST Client)
├── package-lock.json        # Dependências do projeto
├── package.json             # Dependências do projeto
└── README.md                # Documentação