<h1 align="center" style="font-weight: bold;">De Poyisty 🍽️</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a>
</p>

<p align="center">
    Backend for app where users search some food or restaurants and get the list of popular places where they can eat bases on their location or can choose city at filters (also can see the location of this places at the map)
</p>

<h2 id="technologies">💻 Technologies</h2>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

<h2 id="started">🚀 Getting started</h2>

Clone repo to your desktop, don't forget to install all dependencies and open project in some code editor or IDE.

<h3>Prerequisites</h3>

Here are list of all prerequisites necessary for running this project:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

<h3>Cloning</h3>

How to clone this project

```bash
git clone https://github.com/DenysJSE/DePoyistyBackend.git
```

<h3>Config .env variables</h2>

Don't forget to create the `.env` file and add some variables (otherwise the app won't start). Here is the list of variables you will need:

```yaml
PORT=7777
DATABASE_URL="postgresql://user:password@localhost:db_port/db_name?schema=public"
JWT_SECRET="SOMEsecretKEY"
```

<h3>Starting</h3>

How to start your project

```bash
cd de-poyisty-backend
npm run start:dev
```


## License

Nest is [MIT licensed](LICENSE).
