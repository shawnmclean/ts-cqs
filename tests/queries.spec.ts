import { Container, injectable } from 'inversify'
import 'reflect-metadata'

import {
  IQuery,
  IQueryHandler,
  QueryHandler,
  QueryProcessor,
  IQueryProcessor
} from '../src'

namespace Queries {
  export class TestQuery implements IQuery<string> {
    constructor(public readonly val: string) {}
  }

  @injectable()
  @QueryHandler(TestQuery)
  export class TestQueryHandler implements IQueryHandler<TestQuery, string> {
    handle(Query: TestQuery): string {
      return Query.val
    }
  }

  export class PromisedQueryResult {
    constructor(public id: string){}
  } 
  export class PromisedQuery implements IQuery<Promise<PromisedQueryResult>> {
    constructor(public readonly val: string) {}
  }

  @injectable()
  @QueryHandler(PromisedQuery)
  export class PromisedQueryHandler
    implements IQueryHandler<PromisedQuery, Promise<PromisedQueryResult>> {
    async handle(Query: PromisedQuery): Promise<PromisedQueryResult> {
      return Promise.resolve(new PromisedQueryResult(Query.val))
    }
  }
}

describe('Queries', () => {
  describe('when inversify bindings are setup', () => {
    let container: Container
    let queryProcessor: IQueryProcessor

    beforeEach(() => {
      container = new Container()
      container.bind(Queries.TestQueryHandler).toSelf()
      container.bind(Queries.PromisedQueryHandler).toSelf()

      queryProcessor = new QueryProcessor(container)
    })

    it('should execute the correct handler for the Query', () => {
      const expectedVal = 'test-val'
      const query = new Queries.TestQuery(expectedVal)

      const result = queryProcessor.execute<string>(query)

      expect(result).toBe(expectedVal)
    })

    describe('when Query result is a promise', () => {
      it('should execute the correct handler for the Query copy', async () => {
        const expectedVal = 'test-val'
        const query = new Queries.PromisedQuery(expectedVal)
  
        const result = await queryProcessor.execute<Promise<Queries.PromisedQueryResult>>(query)
  
        expect(result.id).toBe(expectedVal)
      })
    })
  })
})
