import { IQuery } from './IQuery'

export interface IQueryHandler<TQuery extends IQuery<TResult>, TResult> {
  handle(query: TQuery): TResult
}
