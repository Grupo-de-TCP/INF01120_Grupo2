# Split&Conquer

Projeto desenvolvido como trabalho final para a disciplina INF01120 - Técnicas de Construção de Programas do Instituto de Informática da Universidade Federal do Rio Grande do Sul (UFRGS), no período letivo de 2024/2.

## Equipe

- Gabriel Perini
- Paulo Henrique Ceccato
- Pedro Bavaresco
- Rafael Petry

## Sobre o Projeto

**Split&Conquer** é uma aplicação de gerenciamento de despesas em grupo, inspirada na funcionalidade do Splitwise. O objetivo é facilitar o controle e a divisão de despesas entre amigos, familiares ou colegas de trabalho, proporcionando uma visão clara de quem deve quanto a quem.

### Funcionalidades

- **Criação de Grupos**: Permite criar grupos de pessoas para organizar as despesas de forma colaborativa.
- **Registro de Despesas**: Permite registrar e categorizar despesas, associando-as a um ou mais membros do grupo.
- **Divisão Automática de Valores**: A aplicação calcula automaticamente o valor que cada membro deve pagar ou receber, com base nas despesas cadastradas.

### Estrutura do Repositório

- **/src**: Contém o código-fonte da aplicação.
- **/pdf**: Documentação em PDF referente ao projeto.
- **/uml**: Diagramas UML que detalham a arquitetura do sistema e o fluxo de dados.
- **assets/**: Assets que precisamos para desenvolver a aplicação.
- **README.md**: Este arquivo.

## Layout

Para visualizar o design da interface da aplicação, acesse o link do Figma abaixo:

[Figma - Split&Conquer](https://www.figma.com/design/T6TM41iFMKwij7gMAP0kdr/Trabalho-de-TCP?node-id=0-1&node-type=canvas&t=K276aUyXKQGyv7zL-0)

### Pré-visualização

![Pré-visualização](./assets/preview-layout.png)

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/RafaelPetr/INF01120_Grupo2.git

## API

### Pré-requisitos para Rodar Localmente

- Java 17 (JDK e JRE)
- Netbeans 23

### Como Rodar Localmente

Abra o diretório **api** como um projeto dentro do Netbeans. Dentro do projeto, abra o arquivo **ApiApplication.java** e execute ele (Shift + F6). Verifique a porta definida pelo Tomcat no output do console (costuma ser 8080), pois ela será usada para realizar as consultas no localhost. Utilize algum software para testar as consultas da API (como Postman). 

Exemplo de consulta: http://localhost:8080/sobre?nome=Rafael

___

### GET /sobre
Retorna uma mensagem de boas-vindas ao usuário.

**Parameters**

|          Nome | Obrigatório |  Tipo   | Descrição                                                                                                                                                         |
| -------------:|:--------:|:-------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `nome` | opcional | string  | O nome do usuário                                                                   |

**Resposta**

```
{
    "id": 1,
    "content": "Bem-vindo à API do Split&Conquer, <nome>!"
}
```
___
