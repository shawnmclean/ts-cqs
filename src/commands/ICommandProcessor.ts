import { ICommand } from './ICommand'

export interface ICommandProcessor {
  execute<TCommand extends ICommand<TResult>, TResult>(command: TCommand): TResult
}
