import { Container, injectable } from 'inversify'
import 'reflect-metadata'

import {
  ICommand,
  ICommandHandler,
  CommandHandler,
  CommandProcessor,
  ICommandProcessor
} from '../src'

namespace Commands {
  export class TestCommand implements ICommand<string> {
    constructor(public readonly val: string) {}
  }

  @injectable()
  @CommandHandler(TestCommand)
  export class TestCommandHandler implements ICommandHandler<TestCommand, string> {
    handle(command: TestCommand): string {
      return command.val
    }
  }

  export class PromisedCommandResult {
    constructor(public id: string){}
  } 
  export class PromisedCommand implements ICommand<Promise<PromisedCommandResult>> {
    constructor(public readonly val: string) {}
  }

  @injectable()
  @CommandHandler(PromisedCommand)
  export class PromisedCommandHandler
    implements ICommandHandler<PromisedCommand, Promise<PromisedCommandResult>> {
    async handle(command: PromisedCommand): Promise<PromisedCommandResult> {
      return Promise.resolve(new PromisedCommandResult(command.val))
    }
  }
}

describe('commands', () => {
  describe('when inversify bindings are setup', () => {
    let container: Container
    let commandProcessor: ICommandProcessor

    beforeEach(() => {
      container = new Container()
      container.bind(Commands.TestCommandHandler).toSelf()
      container.bind(Commands.PromisedCommandHandler).toSelf()

      commandProcessor = new CommandProcessor(container)
    })

    it('should execute the correct handler for the command', () => {
      const expectedVal = 'test-val'
      const command = new Commands.TestCommand(expectedVal)

      const result = commandProcessor.execute<string>(command)

      expect(result).toBe(expectedVal)
    })

    describe('when command result is a promise', () => {
      it('should execute the correct handler for the command copy', async () => {
        const expectedVal = 'test-val'
        const command = new Commands.PromisedCommand(expectedVal)
  
        const result = await commandProcessor.execute<Promise<Commands.PromisedCommandResult>>(command)
  
        expect(result.id).toBe(expectedVal)
      })
    })
  })
})
