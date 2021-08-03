# data-serialize-test

Comparing protobuf (Google) and avro (Apache) with some contrived examples

## Why

We have data stored in complex structures that is changing over time. We want to easily understand the structure of the data at the time it was stored, ideally referencing a schema.

## Comparison checklist

- file type
- installation/usage notes
- what does typescript support look like
- how do you add remove fields over time
- note on usage with graphql
- what is representation of this data

## Google Protobufs/ Protocol Buffer

### file type

`.proto` extension. [spec](https://developers.google.com/protocol-buffers/docs/proto3)

### installation and usage and notes

#### [protobufjs](https://www.npmjs.com/package/protobufjs)

Pure JS implementation. ”Because JavaScript is a dynamically typed language, protobuf.js introduces the concept of a valid message in order to provide the best possible [performance](https://github.com/protobufjs/protobuf.js/#performance) (and, as a side product, proper typings)”.

**Notes:**

- To install: `npm i protobufjs`
- With this implementation the message can also be passed in a plain JS object.
- This package is much more widely used on npm than Google JS port. At the same time, some discussion regarding whether the codebase is being well maintained.

#### [google-protobuf](https://www.npmjs.com/package/google-protobuf)

This the Google implementation of [protobuf](https://github.com/protocolbuffers/protobuf/tree/master/js) for JS.

**Notes:**

- Download the protobuf compiler binary
- Add a step that runs the compiler our build
- Install the `google-protobuf` package in order to create and read the .proto files.

### what does typescript support look like

**protobufjs**
Supports Typescript [out of the box](https://github.com/protobufjs/protobuf.js/#usage-with-typescript). Here is an [issue](https://github.com/protobufjs/protobuf.js/issues/1327) that has more detail about TS support.

**google-protobuf**
Does not export types out of box but some discussion of TS on repo. Need a third party util to generate Typescript types- something like [this](https://github.com/thesayyn/protoc-gen-ts) or [this](https://github.com/improbable-eng/ts-protoc-gen#readme).

### how do you add remove fields over time\*\*

### what would it take for graphql to interact with this data format\*\*

gqlgen supports protobufs

## Apache Avro

Avro does not require that code be generated. Data is always accompanied by a schema.

### file type

`.avsc` extension - holds serialized Avro records along with their schema. [spec](https://avro.apache.org/docs/current/spec.html#Object+Container+Files)

### installation/usage notes

avsc
Pure JavaScript implementation of the Avro specification.

### what does typescript support look like

Not as good/clear. Have to add a third party tool but no discussion of this in avro docs. The tools I found were not well maintained. Documentation is limited here, we would basically run a code generator and the options seem slim.

### how do you add remove fields over time

You just make the change in the schema. There are also functions to resolve compatible schemas but didn’t dig far into those

### what would it take for graphql to interact with this data format
