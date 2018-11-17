import 'reflect-metadata'
import { ICommand } from './ICommand'
import { ICommandProcessor } from './ICommandProcessor'
import { COMMAND_HANDLER_METADATA } from '../constants'

import { Container } from 'inversify'
import { ICommandHandler } from './ICommandHandler'

export class CommandProcessor implements ICommandProcessor {
  constructor(private container: Container) {}

  execute<TResult>(command: ICommand<TResult>): TResult {
    const handlerType = Reflect.getMetadata(COMMAND_HANDLER_METADATA, command)

    const handler = this.container.resolve(handlerType) as ICommandHandler<ICommand<TResult>, TResult>

    return handler.handle(command)
  }
}
