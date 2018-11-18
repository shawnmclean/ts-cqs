import 'reflect-metadata'
import { IQuery } from './index'
import { QUERY_HANDLER_METADATA, QUERY_METADATA } from '../constants'


export const QueryHandler = <TQuery extends IQuery<TResult>, TResult>(query: TQuery): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(QUERY_METADATA, query, target.prototype)
    Reflect.defineMetadata(
      QUERY_HANDLER_METADATA,
      target,
      (query as unknown as Function).prototype
    )
  }
}
