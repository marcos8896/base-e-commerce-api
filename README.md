<h1 align="center"><strong>Base E-Commerce Node API - GraphQL Server w/ TypeScript and Prisma 🐦</strong></h1>

<br />

### Setup

Well, first of all, you will need to have the following software install on your computer:

-   [Docker](https://docs.docker.com/install/ 'Docker')
-   [Docker Compose](https://docs.docker.com/install/ 'Docker')
-   [Node](https://nodejs.org/en/ 'Node')
-   [GIT](https://git-scm.com/downloads 'GIT')
-   [Yarn](https://yarnpkg.com/lang/en/docs/install/ 'Yarn')

Then, you'll need to clone the repository:

```sh
$ git clone https://github.com/marcos8896/base-e-commerce-api.git
```

Install the NPM dependencies:

```sh
$ yarn
```

or alternatively...

```sh
$ npm install
```

After that, you will need to create a file with the name of `.env` on your root directory with the following environment variables:

| Env variable 　　　　　　　　　　　　　 | Description 　　　　　　　　                                                                                                                                                                                                              | Example                                               |
| :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| `PRISMA_PORT`                           | The Prisma port in which your Prisma API will be running on top of a Docker container.                                                                                                                                                    | PRISMA_PORT=4466                                      |
| `PRISMA_API_ENDPOINT`                   | Endpoint that will point to your Prisma API                                                                                                                                                                                               | PRISMA_API_ENDPOINT=http://localhost                  |
| `PRISMA_SECRET`                         | It is the secret protecting access to your Prisma API                                                                                                                                                                                     | PRISMA_SECRET=mysecret123                             |
| `PRISMA_MANAGEMENT_API_SECRET`          | This secret is used to generate and protect your Docker Prisma container. It is important to note that this secret will have to be used as an `export` later on to deployar our changes on the Prisma API. Don't worry, I will explain it | PRISMA_MANAGEMENT_API_SECRET=ultramanagementsecret123 |
| `APP_SECRET`                            | This secret will be used by GraphQL Yoga Server. It basically sign and verify tokens that are sent with requests to the GraphQL Yoga server.                                                                                              | APP_SECRET=appsecret123                               |
| `MYSQL_USER_PRISMA`                     | MySQL user that will be granted with admin privileges (even though Prisma will use the `root` user to connect to the MySQL docker container)                                                                                              | MYSQL_USER_PRISMA=ajalax                              |
| `MYSQL_PASSWORD_PRISMA`                 | The password for the user that was set on the previous `MYSQL_USER_PRISMA` env variables                                                                                                                                                  | MYSQL_PASSWORD_PRISMA=ajalaxpass                      |
| `MYSQL_DATABASE_PRISMA`                 | Database that Prisma will use                                                                                                                                                                                                             | MYSQL_DATABASE_PRISMA=db-test                         |
| `GRAPHQL_SERVER_PORT`                   | The port that our GraphQL Server will use                                                                                                                                                                                                 | GRAPHQL_SERVER_PORT=4000                              |
| `CLOUDINARY_CLOUD_NAME`                 | Cloudinary cloud name from your Cloudinary panel                                                                                                                                                                                          | CLOUDINARY_CLOUD_NAME=cloudname                       |
| `CLOUDINARY_API_KEY`                    | Cloudinary API key from the your Cloudinary panel                                                                                                                                                                                         | CLOUDINARY_API_KEY=cloudname                          |
| `CLOUDINARY_API_SECRET`                 | Your ultrasecret API secret key from your Cloudinary panel                                                                                                                                                                                | CLOUDINARY_API_SECRET=kl12nk3njendajsndjn12j3n1k2     |

Basically, you will end up with a file like this one:

```
PRISMA_PORT=4466
PRISMA_API_ENDPOINT=http://localhost
PRISMA_SECRET=mysecret123
PRISMA_MANAGEMENT_API_SECRET=ultramanagementsecret123
APP_SECRET=appsecret123
MYSQL_USER_PRISMA=ajalax
MYSQL_PASSWORD_PRISMA=ajalaxpass
MYSQL_DATABASE_PRISMA=db-test
GRAPHQL_SERVER_PORT=4000
CLOUDINARY_CLOUD_NAME=cloudname
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=kl12nk3njendajsndjn12j3n1k2
```

Well... after all this installation and evironment stuff, let's jump in and run the Prisma API.
First of all, you have to run the Prisma Server and the MySQL database containers. (By the way, make sure that you have close and open you terminal just to make sure that everything is loaded properly on it).

To run your Prisma Server and MySQL container, you will need to use the next command (on your terminal in the root directory):

```
$ docker-compose up
```

This will execute and run all the container configuration that is placed on the `docker-compose.yml` file with some of the env variables that you had to set previously.

Alternatively you can run the previous command with the `-d` flag, which will allow you to run the docker container on dettach mode. I recommend to run it without that flag, because in this way, you'll be able to see the Prisma Server and MySQL logs.

After running the `docker-compose up`, you're going to need to deploy all the GraphQL schemas that we have created on the project so far. But... there's one more thing that we'll need to deploy our stuff. Remember the `PRISMA_MANAGEMENT_API_SECRET` secret that you just set...? Well, this env variable was used to create the Prisma Server when you run de `docker-compose up` command. In this way, we added another layer of security and only the people who know this env variable secret will be able to deploy on this specific Prisma Server. Guess what? That's you.

So... after that brief explanation, in order to let the Prisma Server know that you have this env variable, you'll need to export it on your terminal (I think this will work on Linux, MacOS and the Bash terminal that you get on Windows when you installed GIT):

```sh
$ export PRISMA_MANAGEMENT_API_SECRET="ultramanagementsecret123"
```

Make sure that the `PRISMA_MANAGEMENT_API_SECRET` env variable that you just set is the same one that you use on your `.env` file (in this case, the exported env variable will need to be surrounded by double quotes). After that. You'll be able to deploy all the GraphQL schemas from this specific terminal. If you close this current terminal, it is very likely that the next one that you open won't contain the exported `PRISMA_MANAGEMENT_API_SECRET` env variable, so, you will have to export it again.
You can also avoid this by setting this globally on your bash settings on Linux and MacOS, or in the System Setting for Windows, but that's up to you.

All right, then... Make sure that you are on the terminal with the exported env variables and run the following command to deploy all the schemas that we have so far.
To do this, run the following command:

```sh
$ prisma deploy prisma/ --env-file ./.env
```

or alternatively you can use a custom one that I created on the `package.json` file:

```sh
$ yarn run prisma-deploy
```

Yei! We have deployed the GraphQL schemas successfully and behind the scenes, Prisma created all the database tables on MySQL. Now you can access the GraphQL Playground to see all the mutations and queries that are available on the Prisma Server. All this stuff can be seen on the http://localhost:4466 (assuming that your `PRISMA_API_ENDPOINT` is equal to `http://localhost` and your `PRISMA_PORT` is equal to `4466`).
You will see something like this:
![prisma_playground](https://user-images.githubusercontent.com/22345533/54801000-5fbbee80-4c2a-11e9-9a6d-f764ca72732b.png)

Try to run that GraphQL query, and you will see that you don't have a proper token to connect to the Prisma Server as it is shown on the next image:
![no_access](https://user-images.githubusercontent.com/22345533/54801077-c6410c80-4c2a-11e9-8104-c8fa42e7cd2d.png)

To be able to see all your query and mutations, you'll need generate a Prisma token. Thankfully, this is very straightforward.
On you terminal run the next command:

```sh
$ prisma token
```

It will generate something like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTUzMjI5ODY1LCJleHAiOjE1NTM4MzQ2NjV9.pzaxHsLzye_duJwoLVHdp5mCHkc2P-KxpkxL0biByN4
```

This will generate a token that will allow us to access the data on the Prisma Server.
Now you can run the GraphQL server, which is the GraphQL Yoga to be precise. This server will be the one in change of all the client request and will act as an intermediary between our Prisma Server and clients basically.

Copy the token, go to the GraphQL Playground on http://localhost:4466 and set a new HTTP Header as it is shown on the next image:
![token](https://user-images.githubusercontent.com/22345533/54801334-fb9a2a00-4c2b-11e9-9107-08389cbfb008.png)

As you can see, you have to set the `Authorization` header with the format of:

```js
{
  "Authorization": "Bearer mytoken"
}
```

Cool. Now we can see all the queries, mutations and schema docs on the Prisma Server Playground.
#####Docs:
![docs](https://user-images.githubusercontent.com/22345533/54801449-8844e800-4c2c-11e9-8674-f3fd4ea943ff.png)

And...
#####Schema
![schema](https://user-images.githubusercontent.com/22345533/54801485-be826780-4c2c-11e9-842c-4dd3bb857923.png)

Yeah... we are almost done with this setup. Now you can run the next command on your terminal to start the GraphQL Yoga Server. Which, if you recall, is the one that act as intermediary to only expose the mutations and queries that we define on our TypeScript/JS code. The command to run it is:

```sh
$ yarn start
```

or

```sh
$ npm start
```

Now you can go to the http://localhost:4000 page to load the GraphQL for the GraphQL Server (not to be confused with the Prisma Server Playground)
![playground_graphql_server](https://user-images.githubusercontent.com/22345533/54801905-a6134c80-4c2e-11e9-8790-38b42714e6b6.png)
