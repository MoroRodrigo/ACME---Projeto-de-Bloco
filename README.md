# Sistema de Gestão de Requisições e Cotações
Este é um sistema desenvolvido em ReactJS com integração ao Firebase para gerenciamento de requisições de compras e cotações. O sistema permite que colaboradores façam requisições, administradores gerenciem cotações, e todas as ações sejam devidamente controladas e acessadas por meio de autenticação de usuários.

## Funcionalidades
1. Autenticação de Usuários
Login e Registro de Usuários: O sistema permite que novos usuários se registrem e façam login utilizando e-mail e senha. Todos os usuários são armazenados no Firebase Authentication.
Administração de Papéis (Roles): Existem dois tipos de usuários: Colaboradores e Administradores. Usuários com papel de Administrador possuem permissões adicionais.
Bloqueio de Usuários: Administradores podem bloquear usuários colaboradores. Usuários bloqueados não conseguem acessar o sistema e recebem uma mensagem informando o bloqueio.
2. Gerenciamento de Requisições de Compras
Criação de Requisições de Compras: Colaboradores podem abrir novas requisições de compras no sistema. Cada requisição contém informações sobre o item desejado, quantidade e motivo da requisição.
Listagem de Requisições de Compras: Colaboradores podem visualizar suas requisições de compras em uma lista ordenada por data (da mais antiga para a mais nova). Cada requisição apresenta o seu estado atual (Aberta, Em Cotação, Cotada).
Exclusão de Requisições: Colaboradores podem excluir suas requisições de compras, independentemente do estado em que elas se encontram.
3. Gerenciamento de Cotações
Mudança de Estado de Requisições:
"Aberta" para "Em Cotação": Quando uma requisição recebe sua primeira cotação, o administrador pode alterar o estado da requisição para "Em Cotação".
"Em Cotação" para "Cotada": Quando uma requisição recebe três cotações, o administrador pode alterar o estado da requisição para "Cotada".
Cadastro de Cotações: Administradores podem registrar cotações de fornecedores para as requisições abertas, com os valores oferecidos e demais detalhes.
4. Exportação de Cotações
Colaboradores podem exportar cotações de uma requisição específica em formato CSV, facilitando o compartilhamento e análise dos dados de cotações.
5. Gerenciamento de Usuários
Criação de Contas de Administrador: Administradores podem criar novas contas de administrador diretamente no sistema.
Visualização e Bloqueio de Contas: Administradores têm acesso a uma lista de colaboradores e podem bloquear ou desbloquear contas, restringindo o acesso de colaboradores ao sistema.
Estrutura do Sistema

## Componentes principais
NavBar: Um componente de navegação responsivo que exibe links relevantes de acordo com o papel do usuário (Administrador ou Colaborador).
Login: Componente para login de usuários e exibição de mensagens de erro apropriadas.
Requisição: Componente para criação, listagem e exclusão de requisições, acessível para colaboradores.
Cotação: Componente de gerenciamento de cotações, utilizado por administradores para atualizar estados e registrar novas cotações.
Firebase
Autenticação: Gerenciamento de usuários (login, registro e controle de acesso).
Firestore: Armazenamento de dados relacionados a requisições, cotações e informações de usuários.
Pré-requisitos
## Para rodar este projeto localmente, você precisará ter instalado:

Node.js
Firebase CLI
Configuração Inicial
Clone o repositório:

bash
Copiar código
git clone https://github.com/MoroRodrigo/ACME---Projeto-de-Bloco.git
cd seu-repositorio
Instale as dependências:

bash
Copiar código
npm install
Configure o Firebase:

Crie um projeto no Firebase.
Configure a autenticação de e-mail/senha.
Crie as coleções necessárias no Firestore (users, requisicoes, cotacoes).
Copie as credenciais de configuração do Firebase para um arquivo .env.local.
Inicie o projeto:

bash
Copiar código
npm start
Como Usar
Faça login com um usuário colaborador ou administrador.
Colaboradores podem abrir e visualizar suas requisições de compras.
Administradores podem visualizar todas as requisições e cadastrar cotações para elas.
Administradores também podem bloquear usuários e criar novas contas de administrador.
Tecnologias Utilizadas
ReactJS: Framework JavaScript para construção da interface do usuário.
Firebase: Utilizado para autenticação e banco de dados em tempo real.
React Firebase Hooks: Para gerenciamento de autenticação e dados do Firestore.
React Router: Para navegação entre páginas.
CSS3: Para estilização do layout e componentes.
JavaScript (ES6): Linguagem principal para desenvolvimento da aplicação.
Melhorias Futuras
Notificações em Tempo Real: Implementar atualizações em tempo real para que colaboradores sejam notificados quando o estado de uma requisição mudar.
Relatórios Detalhados: Permitir que os administradores exportem relatórios mais detalhados sobre as cotações e requisições.
Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests