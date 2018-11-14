[![CircleCI](https://circleci.com/gh/shawnmclean/ts-cqs.svg?style=svg)](https://circleci.com/gh/shawnmclean/ts-cqs)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a072ff400fbfd20fab21/test_coverage)](https://codeclimate.com/github/shawnmclean/ts-cqs/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/a072ff400fbfd20fab21/maintainability)](https://codeclimate.com/github/shawnmclean/ts-cqs/maintainability)

# ts-cqs

Light Command and Query Separation framework for typescript that uses inversify for dependency injection.

> :warning: **Note**, this is not a CQRS library

## Motivation

Following the single responsibility principle, the command and query separation pattern works well. This library sets out to provide a framework in to replicate the CQS pattern in typescript that uses the dependency injection framework [InversifyJs](https://github.com/inversify/InversifyJS).

There are CQRS libraries such as [NestJS/CQRS](https://github.com/nestjs/cqrs) that provides a framework for this pattern. However, it adheres more to the CQRS pattern with event sourcing and uses the bus (command/query processor) as a way to wire up the dependency injection. This library seeks to use a single place for wiring up dependencies.

## Installation

```sh
npm install ts-cqs inversify reflect-metadata --save
```

The InversifyJS type definitions are included in the inversify npm package.

> :warning: **Important!** ts-cqs requires has a peer dependency on [InversifyJs](https://github.com/inversify/InversifyJS), please view their readme for their requirements.

## Usage

### Commands

```typescript
// TestCommand.ts

import 'reflect-metadata'
import { injectable } from 'inversify'
import { ICommand, ICommandHandler, CommandHandler } from 'ts-cqs'

export class TestCommand implements ICommand {
  constructor(public readonly val: string) {}
}

@injectable()
@CommandHandler(TestCommand)
export class TestCommandHandler implements ICommandHandler<TestCommand> {
  async execute(command: TestCommand): Promise<string> {
    return Promise.resolve(command.val)
  }
}
```

`ICommandHandler.execute` is set to return `any`. In this case, command handlers can chose to return something or not.

```typescript
// CompositeRoot.ts

import { Container } from 'inversify'
import { TestCommandHandler } from './TestCommand'

const container = new Container()
container.bind(TestCommandHandler).toSelf()
```

The inversify binding here uses the handler class as the id. See [docs](https://github.com/inversify/InversifyJS/blob/master/wiki/classes_as_id.md)

```typescript
// SomeConsumerClass.ts

import { CommandProcessor } from 'ts-cqs'
import { TestCommand } from './TestCommand'

export class SomeConsumerClass {
  constructor(private commandProcessor: CommandProcessor) {}

  async use(): Promise<string> {
    const testCommand = new TestCommand('some value')
    const commandResult = await this.commandProcessor.execute(testCommand)

    console.log(commandResult) // logs 'some value'
  }
}
```

### Queries

In development

## Contributing

### Tests

```sh
npm run test
```
