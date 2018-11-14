import { ICommand } from './ICommand'

export interface ICommandHandler<T extends ICommand> {
  handle(command: T): any
}
