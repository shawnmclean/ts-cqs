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
    resultType!: string
    constructor(public readonly val: string) {}
  }

  @injectable()
  @CommandHandler(TestCommand)
  export class TestCommandHandler
    implements ICommandHandler<TestCommand, string> {
    async handle(command: TestCommand): Promise<string> {
      return command.val
    }
  }

  export class Command2Result {
    constructor(public id: string) {}
  }
  export class Command2 implements ICommand<Command2Result> {
    resultType!: Command2Result
    constructor(public readonly val: string) {}
  }

  @injectable()
  @CommandHandler(Command2)
  export class Command2Handler
    implements ICommandHandler<Command2, Command2Result> {
    async handle(command: Command2): Promise<Command2Result> {
      return Promise.resolve(new Command2Result(command.val))
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
      container.bind(Commands.Command2Handler).toSelf()

      commandProcessor = new CommandProcessor(container)
    })

    it('should execute the correct handler for the command', async () => {
      const expectedVal = 'test-val'
      const command = new Commands.TestCommand(expectedVal)

      const result = await commandProcessor.execute(command)

      expect(result).toBe(expectedVal)
    })
  })
})
