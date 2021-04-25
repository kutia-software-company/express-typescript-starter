# Quick Start

### Installation

```console
npm install
cp .env.example .env
npm run dev
```

### Docker

Docker is a platform for developers and sysadmins to build, run, and share applications with containers.

- Starts the containers in the background and leaves them running: `docker-compose up -d`.
- Stops containers and removes containers, networks, volumes, and images: `docker-compose down`.

### API Routes

The route prefix is `/api` by default, but you can change this in the .env file.

| Route          | Description |
| -------------- | ----------- |
| **/**          | Home page |
| **/api/login** | Login |
| **/api/users** | Example entity endpoint |
| **/docs**      | This is the Swagger UI with our API documentation |
| **/graphql**   | Route to the graphql editor or your query/mutations requests |

### Database Migration

- Run `npm run make:migration {name}` to create a new migration file.
- To migrate your database run `npm run migrate`.

### Running Seeders

- You may execute the `npm run db:seed` command to seed your database.

### Enable Cron Jobs

To enable cron jobs you just need to update your env file by set `ENABLE_CRON_JOBS` to `true`.

### Sending Mail

```ts
import { MailService } from '@base/infrastructure/services/mail/MailService';

public async sendMail() {
    return await (new MailService).text('Hello').to('example@gmail.com').send();
}
```

### Upload File

```ts
import { StorageService } from '@base/infrastructure/services/storage/StorageService';

@Put('/:id')
public async update(@Param('id') id: number, @UploadedFile('file') file: Express.Multer.File) {
    return await (new StorageService).put(file.originalname, file.buffer);
}
```