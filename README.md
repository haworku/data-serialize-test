# data-serialize-test

Comparing protobuf (Google) and avro (Apache) with some contrived examples

## Why

We have data stored in complex structures that is changing over time. We want to easily understand the structure of the data at the time it was stored, ideally referencing a schema.

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

Pure JS implementation. \* Suggested approach for protobuf.

#### [google-protobuf](https://www.npmjs.com/package/google-protobuf)

Google implementation of [protobuf](https://github.com/protocolbuffers/protobuf/tree/master/js) for JS.

Generalized steps to use: create schema, compile schema, create and use serializer to translate from protobuf into domain model

**Notes:**

- Would need to run the [protobuf compiler](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation) in our build process
- for `google-protobuf` package - "Support for ES6-style imports is not implemented yet. Browsers can be supported by using Browserify, webpack, Closure Compiler, or similar to resolve imports at compile time."
- for `protobufjs` package - this package is much more widely used on npm than Google JS port. At the same time, some discussion regarding whether the codebase is being well maintained. Also re performance - ”Because JavaScript is a dynamically typed language, protobuf.js introduces the concept of a valid message in order to provide the best possible [performance](https://github.com/protobufjs/protobuf.js/#performance) (and, as a side product, proper typings)”. With this implementation, the message can also be passed in a plain JS object.

### what does typescript support look like for protobufs

**protobufjs**
Supports Typescript [out of the box](https://github.com/protobufjs/protobuf.js/#usage-with-typescript). Here is an [issue](https://github.com/protobufjs/protobuf.js/issues/1327) that has more detail about TS support.

**google-protobuf**
Does not export types out of box but there is discussion of TS on repo. Will need a third party util to generate Typescript types- something like [this](https://github.com/thesayyn/protoc-gen-ts) or [this](https://github.com/improbable-eng/ts-protoc-gen#readme).

### how do you add remove fields over time in protobuf approach

- get familiar with [field numbers](https://developers.google.com/protocol-buffers/docs/proto3#assigning_field_numbers)
- ideally don't remove fields and don't make fields required
- on [backwards compatibility issues with oneof fields](https://developers.google.com/protocol-buffers/docs/proto3#backwards-compatibility_issues). Relevant for dealing with enums.

### protobuf tooling

- graphql - `gqlge`n` supports protobufs

### what does the protobuf schema look like?

TODO

### outstanding questions about protobuf approach

- would we want to store the exact protobuf schema used for a specific submission along with the record

## Apache Avro

Avro relies on schemas. When Avro data is read, the schema used when writing it is always present.

### `.avsc` file type

`.avsc` extension - holds serialized Avro records along with their schema. [spec](https://avro.apache.org/docs/current/spec.html#Object+Container+Files)

### avro installation/usage notes

`avsc`
Pure JavaScript implementation of the Avro specification.

Generalized steps to use: either create a schema OR use a library to generate a schema from your data model.

**Notes:**
Difference from Avro and other systems according to their docs:

> - Dynamic typing: Avro does not require that code be generated. Data is always accompanied by a schema that permits full processing of that data without code generation, static datatypes, etc. This facilitates construction of generic data-processing systems and languages.
> - Untagged data: Since the schema is present when data is read, considerably less type information need be encoded with data, resulting in smaller serialization size.
> - No manually-assigned field IDs: When a schema changes, both the old and new schema are always present when processing data, so differences may be resolved symbolically, using field names.

### what does typescript support look like for avro

Not as good/clear. Have to add a third party tool but no discussion of this in avro docs. The tools I found were not well maintained. Documentation is limited here, we would basically run a code generator and the options seem slim.

### how do you add remove fields over time in the avro approach

TODO There are also functions to resolve compatible schemas
See avro docs on [schema resolution](https://avro.apache.org/docs/current/spec.html#Schema+Resolution)

### avro tooling

TODO

### what does the avro schema look like?

See [test.avsc](./src/test.avsc)

### outstanding questions about avro approach

- How much will lack of docs be a pain point? Had much more trouble figuring out the avro schema format and debugging issues than protobufs, simply because there were many more docs.

## Other readings of interest

- [Best serialization stategy for event sourcing (compares protobuf and avro directly)](https://blog.softwaremill.com/the-best-serialization-strategy-for-event-sourcing-9321c299632b)
- [Kafka with avro versus Kafka with protobuf](https://simon-aubury.medium.com/kafka-with-avro-vs-kafka-with-protobuf-vs-kafka-with-json-schema-667494cbb2af)
