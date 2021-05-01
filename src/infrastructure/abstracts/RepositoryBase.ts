import { MainRepository } from 'typeorm-simple-query-parser';

export abstract class RepositoryBase<T> extends MainRepository<T> {}
