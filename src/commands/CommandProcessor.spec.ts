import 'reflect-metadata'
import {
  ICommand,
  ICommandHandler,
  CommandHandler,
  CommandProcessor
} from './index'

import { Container, injectable } from 'inversify'
namespace Commands {
  export class TestCommand implements ICommand {
    constructor(public val: string) {}
  }

  @injectable()
  @CommandHandler(TestCommand)
  export class TestCommandHandler implements ICommandHandler<TestCommand> {
    async execute(command: TestCommand): Promise<string> {
      return Promise.resolve(command.val)
    }
  }
}

describe('CommandProcessor', () => {
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
  })
})
