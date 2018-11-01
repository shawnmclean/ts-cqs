import { ICommand } from './ICommand'

export interface ICommandHandler<T extends ICommand> {
  execute(command: T): Promise<any>
}
