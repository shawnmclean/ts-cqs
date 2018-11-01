import { ICommand } from './ICommand'
import { ICommandHandler } from './ICommandHandler'
import { ICommandProcessor } from './ICommandProcessor'

export class CommandProcessor implements ICommandProcessor {
  execute<T extends ICommand>(command: T): Promise<any> {
    throw new Error('Method not implemented.')
  }

  private getCommandName(command: ICommand): string {
    const { constructor } = Object.getPrototypeOf(command)
    return constructor.name as string
  }
}
