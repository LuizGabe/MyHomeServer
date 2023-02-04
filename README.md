# Meu Servidor Doméstico

## Introduction
Este backend é responsável por coletar os dados de temperatura de um dispositivo ESP01 e armazená-los em um banco de dados. As informações são facilmente acessíveis através das rotas disponíveis, listadas abaixo.

## Rotas
#### /hello
- `GET` - retorna um Hello World, e um numero que vai acrescentando conforme as requests

#### /temperature
- `GET /latest` - retorna o último dado de temperatura coletado
- `GET /all` - retorna todos os dados de temperatura coletados
- `GET /id/:number` - retorna o dado de temperatura com o ID especificado
- `GET ?start=1&limit=10` - retorna elementos limitados, começando em "start", com quantidade definida por "limit"
- `POST /` - cria um novo dado de temperatura

## To Do
- [ ] Colocar as imagens em uma fonte mais segura
- [ ] Criar uma página web para visualizar o último dado de temperatura
- [ ] Implementar armazenamento em cache para otimizar o tempo de resposta
- [ ] Adicionar suporte para múltiplos dispositivos ESP01

## ESP01, com sensor de temperatura/umidade:
### V1: 
<img align="left"  width="250" src="https://i.ibb.co/D8KrcRW/20230203-203557.jpg">
<img width="250" src="https://i.ibb.co/nngnxtP/20230203-203517.jpg">




## Feito por:
[
<img src="https://github.com/luizgabe.png?size=115" width=115><br>
<sub>@LuizGabe</sub>
](
https://github.com/luizgabe
)
