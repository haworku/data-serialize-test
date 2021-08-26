# data-serialize-test

Comparing protobuf (Google) and avro (Apache) with some contrived examples

## Why

We have data stored in complex structures that is changing over time. We want to easily understand the structure of the data at the time it was stored by referencing a schema. Also want to be able to read the schema both client-side and server-side since both areas of the app need to reference the structure of the data.

## Comparison checklist

- file type
- installation/usage notes
- what does typescript support look like
- how do you add remove fields over time
- tooling
- what does the schema look like?
- outstanding questions

## Google Protobufs/ Protocol Buffer

Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data.

### `.proto` file type

`.proto` extension. [spec](https://developers.google.com/protocol-buffers/docs/proto3)

### installation and usage and notes

Explored two main packages for bringing in protobuf support to Node.

#### [protobufjs](https://www.npmjs.com/package/protobufjs)

Pure JS implementation. **Suggested approach**

This package is much more widely used on npm than Google JS port. At the same time, some discussion regarding whether the codebase is being well maintained.

> ”Because JavaScript is a dynamically typed language, protobuf.js introduces the concept of a valid message in order to provide the best possible [performance](https://github.com/protobufjs/protobuf.js/#performance) (and, as a side product, proper typings)”. With this implementation, the message can also be passed in a plain JS object.

#### [google-protobuf](https://www.npmjs.com/package/google-protobuf)

Google implementation of [protobuf](https://github.com/protocolbuffers/protobuf/tree/master/js) for JS. Does not export types out of box but there is discussion of TS on repo. Will need a third party util to generate Typescript types- something like [this](https://github.com/thesayyn/protoc-gen-ts) or [this](https://github.com/improbable-eng/ts-protoc-gen#readme).

> "Support for ES6-style imports is not implemented yet. Browsers can be supported by using Browserify, webpack, Closure Compiler, or similar to resolve imports at compile time."

**Notes:**

- Would need to run the [protobuf compiler](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation) in our build process
- Generalized steps to use: create schema, compile schema, create and use serializer to translate from protobuf into domain model

### what does typescript support look like for protobuf

**protobufjs**
Supports Typescript [out of the box](https://github.com/protobufjs/protobuf.js/#usage-with-typescript). Types seeem well defined. Here is an [issue](https://github.com/protobufjs/protobuf.js/issues/1327) that has more detail about TS support.

example:

```typescript
(method) Type.verify(message: {
    [k: string]: any;
}): string | null
Verifies that field values are valid and that required fields are present.

@param message — Plain object to verify

@returns — null if valid, otherwise the reason why it is not
```

### how do you add remove fields over time in protobuf approach

TODO

- [field numbers](https://developers.google.com/protocol-buffers/docs/proto3#assigning_field_numbers) are essential
- ideally don't remove fields and don't make fields required
- on [backwards compatibility issues with oneof fields](https://developers.google.com/protocol-buffers/docs/proto3#backwards-compatibility_issues). Relevant for dealing with enums.

### protobuf tooling

TODO

- graphql - `gqlgen` supports protobufs

### what does the protobuf schema look like?

TODO

See [test.proto](./src/test.proto)

### outstanding questions about protobuf approach

- how will we store and associate the protobuf schema used for a specific submission.
- what does schema resolution look like with protobufs

## Apache Avro

Avro relies on schemas. When Avro data is read or written, the schema is always present.

### `.avsc` file type

`.avsc` extension - holds serialized Avro records along with their schema. [spec](https://avro.apache.org/docs/current/spec.html#Object+Container+Files)

### avro installation/usage notes

`avsc` package
Pure JavaScript implementation of the Avro specification.

More about creating a schema in avro spec [docs](https://avro.apache.org/docs/1.10.2/spec.html#schema_record). See also [`avsc` API docs](https://github.com/mtth/avsc/wiki/API)

_Difference from Avro and other systems:_

> - Dynamic typing: Avro does not require that code be generated.
> - Untagged data: Avro data itself is not tagged with type information. The schema is required to parse data.
> - No manually-assigned field IDs: When a schema changes, both the old and new schema are always present when processing date. Differences are resolved using field `name`.

### what does typescript support look like for avro

No maintained types package. There is a `/types` folder in the `avsc` package which is discussed in this [issue](https://github.com/mtth/avsc/issues/128). Better than nothing but pretty broadly typed - e.g. for [`isValid`](https://github.com/mtth/avsc/wiki/API)

```
isValid: (arg0: any, arg1: {
    errorHook: (path: any) => void;
}) => void
```

### how do you add remove fields over time in the avro approach

There are functions to resolve compatible schemas. See discussion of [createResolver](https://github.com/mtth/avsc/wiki/API#typecreateresolverwritertype-opts) and schema evolution in [asvc docs](https://github.com/mtth/avsc/wiki/Advanced-usage#schema-evolution). This pattern allows comparing subsets of fields within a record.

See avro docs on [schema resolution](https://avro.apache.org/docs/current/spec.html#Schema+Resolution)

### avro tooling

Didn't see any tooling specifically we would need to start using this package as is server side or client side.

### what does the avro schema look like?

See [test.avsc](./src/test.avsc)

### outstanding questions about avro approach

- How much will lack of docs and well defined types be a pain point? Does it matter if we go with a less widely used option like Avro over protobufs - which is well documented in multiple languages, has robust TS support?
- Had trouble debugging issues with avro schema. Error messages were vague, no line numbers. Was harder to find example schemas or discussion of approaches on stackoverflow. Specifically nesting of types (for example, see itemsAmended in `test.avsc`) could be a lot to grok if we plan to nest our data structure within more layers.

## Other readings of interest

> "Personally, I would use Avro for simple domains with mostly primitive types. For rich domains, with complex types and structures, I’ve been using Protocol Buffers for quite some time. Clean domain with no serialization influence is really worth paying the boilerplate code price."

- [Best serialization stategy for event sourcing (compares protobuf and avro directly](https://blog.softwaremill.com/the-best-serialization-strategy-for-event-sourcing-9321c299632b)
- [Kafka with avro versus Kafka with protobuf - gets into schema evolution](https://simon-aubury.medium.com/kafka-with-avro-vs-kafka-with-protobuf-vs-kafka-with-json-schema-667494cbb2af)
