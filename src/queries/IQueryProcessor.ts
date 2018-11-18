import { IQuery } from './IQuery'

export interface IQueryProcessor {
  execute<TResult>(query: IQuery<TResult>): TResult
}
