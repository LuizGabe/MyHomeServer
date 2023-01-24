#!/bin/bash

# Nome de usuário e endereço IP do servidor remoto
remote=u0_a147@192.168.1.103

# Executa o script reload.sh no servidor remoto
ssh $remote -p 8022 "cd server && yarn start"