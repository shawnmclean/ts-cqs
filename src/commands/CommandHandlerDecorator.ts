import 'reflect-metadata'
import { ICommand } from './index'
import { COMMAND_HANDLER_METADATA, COMMAND_METADATA } from '../constants'

export const CommandHandler = (command: ICommand): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(COMMAND_METADATA, command, target.prototype)
    Reflect.defineMetadata(
      COMMAND_HANDLER_METADATA,
      target,
      (command as Function).prototype
    )
  }
}
