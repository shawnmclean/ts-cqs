import 'reflect-metadata'
import { ICommand } from './ICommand'
import { ICommandProcessor } from './ICommandProcessor'
import { COMMAND_HANDLER_METADATA } from '../constants'

import { Container } from 'inversify'
import { ICommandHandler } from './ICommandHandler'

export class CommandProcessor implements ICommandProcessor {
  constructor(private container: Container) {}

  execute<TCommand extends ICommand<TResult>, TResult>(command: TCommand): TResult {
    const handlerType = Reflect.getMetadata(COMMAND_HANDLER_METADATA, command)

    const handler = this.container.resolve(handlerType) as ICommandHandler<TCommand, TResult>

    return handler.handle(command)
  }
}
