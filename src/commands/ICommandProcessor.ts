import { ICommand } from './ICommand'

export interface ICommandBus {
  execute<T extends ICommand>(command: T): Promise<any>
}
