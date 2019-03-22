import 'reflect-metadata'
import { COMMAND_HANDLER_METADATA, COMMAND_METADATA } from '../constants'

export const CommandHandler = (command: NewableFunction): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(COMMAND_METADATA, command, target.prototype)
    Reflect.defineMetadata(
      COMMAND_HANDLER_METADATA,
      target,
      ((command as unknown) as Function).prototype
    )
  }
}
