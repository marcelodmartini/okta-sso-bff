# API REST in Nodejs with typescript and sequelize

Proyecto de ejemplo sobre como desarrollar una Api REST con las tecnologías mencionadas

#### Clonar repositorio con `git clone https://gitlab.okta.com/desarrolladores/templates/sso/okta-sso-bff.git`
#### Instalar dependencias `npm install`
#### Crear base de datos users
#### Ejecutar script dump.sql
#### Crear archivo .env y colocar las siguientes variables
1. PORT=puerto
2. DB_HOST=hostDB
3. DB_PORT=portDB
4. DB_USER=userDB
5. DB_PASSWORD=passwordDB
6. DB_NAME=nameDB
#### Para ejecutar el proyecto contamos con los siguientes comandos
1. `npm run debug ` ejecuta el proyecto en modo debug
2. `npm run build` transpila el proyecto y genera el dist con codigo javascript
3. `npm run start` toma el dist para ejecutar el proyecto

#### Para ejecutar las pruebas unitarias se debe ejecutar cualquiera de los siguientes comandos
1. `npm run test` para correr las pruebas unitarias y de integración
2. `npm run test-report` para correr las pruebas unitarias y generar reporte de cobertura