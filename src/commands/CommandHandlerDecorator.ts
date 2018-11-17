import 'reflect-metadata'
import { ICommand } from './index'
import { COMMAND_HANDLER_METADATA, COMMAND_METADATA } from '../constants'


export const CommandHandler = <TCommand extends ICommand<TResult>, TResult>(command: TCommand): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(COMMAND_METADATA, command, target.prototype)
    Reflect.defineMetadata(
      COMMAND_HANDLER_METADATA,
      target,
      (command as unknown as Function).prototype
    )
  }
}
