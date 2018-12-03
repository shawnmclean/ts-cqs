import 'reflect-metadata'
import { IQuery } from './IQuery'
import { IQueryProcessor } from './IQueryProcessor'
import { QUERY_HANDLER_METADATA } from '../constants'

import { Container, injectable } from 'inversify'
import { IQueryHandler } from './IQueryHandler'

@injectable()
export class QueryProcessor implements IQueryProcessor {
  constructor(private container: Container) {}

  execute<TResult>(query: IQuery<TResult>): TResult {
    const handlerType = Reflect.getMetadata(QUERY_HANDLER_METADATA, query)

    const handler = this.container.resolve(handlerType) as IQueryHandler<IQuery<TResult>, TResult>

    return handler.handle(query)
  }
}
