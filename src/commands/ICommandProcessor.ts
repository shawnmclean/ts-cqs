import { ICommand } from './ICommand'

export interface ICommandProcessor {
  execute<TResult>(command: ICommand<TResult>): TResult
}
