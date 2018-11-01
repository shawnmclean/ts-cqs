import { ICommand } from './ICommand'

export interface ICommandProcessor {
  execute<T extends ICommand>(command: T): Promise<any>
}
