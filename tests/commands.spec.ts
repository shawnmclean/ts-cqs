import { Container, injectable } from 'inversify'
import 'reflect-metadata'

import {
  ICommand,
  ICommandHandler,
  CommandHandler,
  CommandProcessor
} from '../src/commands'

namespace Commands {
  export class TestCommand implements ICommand {
    constructor(public readonly val: string) {}
  }

  @injectable()
  @CommandHandler(TestCommand)
  export class TestCommandHandler implements ICommandHandler<TestCommand> {
    async execute(command: TestCommand): Promise<string> {
      return Promise.resolve(command.val)
    }
  }

  export class TestCommandCopy implements ICommand {
    constructor(public readonly val: string) {}
  }

  @injectable()
  @CommandHandler(TestCommandCopy)
  export class TestCommandHandlerCopy
    implements ICommandHandler<TestCommandCopy> {
    async execute(command: TestCommandCopy): Promise<string> {
      return Promise.resolve(command.val + ' copy')
    }
  }
}

describe('commands', () => {
  describe('when inversify bindings are setup', () => {
    let container: Container

    beforeEach(() => {
      container = new Container()
      container.bind(Commands.TestCommandHandler).toSelf()
    })

    it('should execute the correct handler for the command', async () => {
      const expectedVal = 'test-val'
      const command = new Commands.TestCommand(expectedVal)

      const commandProcessor = new CommandProcessor(container)
      const result = await commandProcessor.execute(command)

      expect(result).toBe(expectedVal)
    })

    it('should execute the correct handler for the command copy', async () => {
      const expectedVal = 'test-val'
      const command = new Commands.TestCommandCopy(expectedVal)

      const commandProcessor = new CommandProcessor(container)
      const result = await commandProcessor.execute(command)

      expect(result).toBe(expectedVal + ' copy')
    })
  })
})
