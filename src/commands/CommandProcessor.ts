import 'reflect-metadata'
import { ICommand } from './ICommand'
import { ICommandProcessor } from './ICommandProcessor'
import { COMMAND_HANDLER_METADATA } from '../constants'

import { Container, injectable } from 'inversify'
import { ICommandHandler } from './ICommandHandler'

@injectable()
export class CommandProcessor implements ICommandProcessor {
  constructor(private container: Container) {}

  execute<TResult>(command: ICommand<TResult>): Promise<TResult> {
    const handlerType = Reflect.getMetadata(COMMAND_HANDLER_METADATA, command)

    const handler = this.container.get(handlerType) as ICommandHandler<
      ICommand<TResult>,
      TResult
    >

    return handler.handle(command)
  }
}
