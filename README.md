# C-Medic

**C-Medic** é um sistema de gestão para clínicas médicas e consultórios, desenvolvido em **Node.js**, com foco na automação e organização dos processos administrativos, clínicos e financeiros.

## 📋 Funcionalidades

- **Gestão de materiais**
  - Controle de insumos médicos, como medicamentos e EPIs.

- **Inventário de estoque**
  - Monitoramento de entrada, uso e vencimento dos materiais.

- **Processo de vendas**
  - Agendamento de consultas.
  - Emissão de guias de convênio.

- **Carrinho de compras**
  - Seleção de exames e procedimentos pelo paciente antes da confirmação da consulta.

- **Máquina de estados para vendas**
  - Controle de status da consulta: `Agendada`, `Realizada`, `Cancelada`.

- **Gestão de contas a pagar**
  - Pagamentos de médicos, fornecedores e despesas operacionais.

- **Gestão de contas a receber**
  - Faturamento de consultas particulares e convênios.

- **Gestão de funcionários**
  - Administração de médicos, recepcionistas, técnicos e demais colaboradores.

- **Relatórios de contabilidade**
  - Relatórios de faturamento, desempenho e análise de custos.

## ✅ Requisitos Funcionais

- O sistema deve permitir o cadastro, edição e exclusão de pacientes, funcionários e fornecedores.
- Deve ser possível agendar e atualizar o status de uma consulta.
- O sistema deve controlar o estoque de materiais com alertas de vencimento.
- Deve gerar relatórios de contas a pagar/receber e de contabilidade.
- O sistema deve emitir comprovantes e guias de convênio.

## ⚙️ Requisitos Não Funcionais

- Backend desenvolvido com **Node.js**.
- Persistência de dados com banco relacional (ex: MySQL ou PostgreSQL).
- Código modular e com boas práticas de organização (MVC ou Clean Architecture).
- API RESTful documentada.
- Segurança na manipulação de dados sensíveis.
- Escalabilidade para suportar múltiplas clínicas e unidades.

## 🚧 Em desenvolvimento

Este projeto ainda está em fase inicial de desenvolvimento. Acompanhe o progresso nas branches do repositório e colabore com sugestões e melhorias.

---

## 📁 Estrutura sugerida

```bash
C-Medic/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🛠 Tecnologias previstas

- Node.js
- Express.js
- Sequelize ou Prisma (ORM)
- MySQL/PostgreSQL
- JWT (autenticação)
---
