# C-Medic
Este projeto tem como objetivo desenvolver um sistema completo de gestão clínica utilizando C# e ASP.NET Core. A aplicação cobre desde o controle de estoque e agendamentos até a contabilidade e faturamento, visando atender às necessidades operacionais de clínicas e consultórios médicos de forma eficiente.
# 🏥 Sistema de Gestão para Clínica Médica

Sistema completo para gestão de clínicas médicas, com foco em automação de processos, controle de estoque, gestão financeira e atendimento ao paciente. Desenvolvido em **C# com ASP.NET Core** e banco de dados **MySQL**, o sistema abrange desde o agendamento de consultas até a contabilidade da clínica.

---

## 🚀 Funcionalidades

### 📦 Gestão de Materiais
- Controle de insumos médicos (medicamentos, EPIs)
- Lançamento de entradas, saídas e transferências

### 📋 Inventário de Estoque
- Monitoramento de níveis de estoque
- Alerta de vencimento de materiais

### 🩺 Processo de Vendas
- Agendamento de consultas médicas
- Emissão de guias para convênios

### 🛒 Carrinho de Compras
- Seleção de exames e procedimentos pelo paciente

### ⚙️ Máquinas de Estados
- Controle de status de consultas: agendada, realizada, cancelada

### 💸 Gestão Financeira
- **Contas a Pagar**: médicos, fornecedores e despesas
- **Contas a Receber**: faturamento de convênios e particulares

### 👥 Gestão de Funcionários
- Cadastro de médicos, recepcionistas e técnicos

### 📊 Relatórios de Contabilidade
- Relatórios de faturamento
- Análise de custos e desempenho financeiro

---

## 🛠️ Tecnologias Utilizadas

- [C#](https://docs.microsoft.com/dotnet/csharp/)
- [ASP.NET Core](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core/)
- [Pomelo.EntityFrameworkCore.MySql](https://www.nuget.org/packages/Pomelo.EntityFrameworkCore.MySql/)
- [Swagger](https://swagger.io/tools/swagger-ui/) para documentação da API
- [MySQL](https://www.mysql.com/) como banco de dados relacional

---

## 📁 Estrutura do Projeto

/API ├── Controllers ├── Data ├── Models ├── Migrations ├── Program.cs ├── appsettings.json

yaml
Copiar
Editar

---

## ⚙️ Como Executar

### Pré-requisitos:
- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- Visual Studio ou VS Code com C# Extension

### Passos:

```bash
# Restaurar pacotes
dotnet restore

# Criar o banco de dados com migrations
dotnet ef migrations add Initial
dotnet ef database update

# Executar a aplicação
dotnet run
Depois, acesse:
📍 https://localhost:5001/swagger
ou
📍 http://localhost:5000/swagger

✅ Requisitos
Funcionais
Cadastro e gerenciamento de produtos e consultas

Agendamento com verificação de disponibilidade

Controle de contas a pagar e receber

Não Funcionais
API RESTful com autenticação (futura implementação)

Interface amigável via Swagger

Persistência com MySQL

Padrão MVC com Entity Framework


