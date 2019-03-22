import { ICommand } from './ICommand'

export interface ICommandHandler<TCommand extends ICommand<TResult>, TResult> {
  handle(command: TCommand): Promise<TResult>
}
