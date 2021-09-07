# Google Protobufs/ Protocol Buffer

Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data.

## `.proto` file type

`.proto` extension. [spec](https://developers.google.com/protocol-buffers/docs/proto3).

See also discussion of [tradeoffs](https://github.com/protobufjs/protobuf.js/blob/d01394a1463062824c066b653aad53c449752202/cli/README.md#reflection-vs-static-code) between `.proto`, JSON, and static code generation.

## installation and usage and notes

Explored two main packages for bringing protobuf support to Node.

### [protobufjs](https://www.npmjs.com/package/protobufjs)

Pure JS implementation. 73.5kB minimized. Also a [lightweight version](https://github.com/dcodeIO/protobuf.js/tree/master/dist/light) and [minimal version](https://github.com/protobufjs/protobuf.js/tree/master/dist/minimal) available.

> ”Because JavaScript is a dynamically typed language, protobuf.js introduces the concept of a valid message in order to provide the best possible [performance](https://github.com/protobufjs/protobuf.js/#performance) (and, as a side product, proper typings)”. With this implementation, the message can also be passed in a plain JS object.

This package is much more widely used on npm than Google JS port and using this tool does not require a separate compile step while using `.proto` files directly.

However...

- lots of open issues.
- there is [discussion](https://github.com/protobufjs/protobuf.js/issues/1327#issue-527757006) regarding whether the codebase is being well maintained.

### [google-protobuf](https://www.npmjs.com/package/google-protobuf)

229.5kB minified

Google implementation of [protobuf](https://github.com/protocolbuffers/protobuf/tree/master/js) for JS. Stable and maintained, likely more comparable to using protobufs in other languages.

However...

- will need to run the [protobuf compiler](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation) in our build process and into local dev. Something like `yarn proto gen` that acts similar to gql codegen.
- will need a third party util to generate Typescript types - something like [this](https://github.com/improbable-eng/ts-protoc-gen#readme) or [this](https://github.com/stephenh/ts-proto).
- while the protocol buffers spec is well documented, the API for this lib [is not](https://github.com/protocolbuffers/protobuf/tree/master/js#api)
- support for ES6-style imports is not implemented yet

## what does typescript support look like

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

**google-protobuf**
Does not support types out of the box.

## how do you add remove fields over time in protobuf approach

You can add new fields to the schema, provided that you give each field a new field number. If old code tries to read data written by new code with new fields, it can simply ignore that field. In terms of backward compatibility, new code can always read old data as well since the field numbers are unique.
Basics:

- [field numbers](https://developers.google.com/protocol-buffers/docs/proto3#assigning_field_numbers) are essential
- rule of thumb: don't remove fields and don't make fields required
- on [backwards compatibility issues with oneof fields](https://developers.google.com/protocol-buffers/docs/proto3#backwards-compatibility_issues). This is relevant for dealing with enums.
- changing the data type of a field is possible but there is a risk values lose precision or get truncated
- `repeated` marker is what Protobufs uses for arrays. This means is trivial for a schema to interpret a change for a field from a single value to an array of those values or back again. New code reading old data sees a list with zero or one elements (depending on whether the field was present); old code reading new data sees only the last element of the list.

## how to store protobuf schema in db

- Protobufs [does not have self describing messages](https://developers.google.com/protocol-buffers/docs/techniques#self-description). Likely in our use case `.proto` file will have to be updated.

## tooling

- if not using protobufjs, some kind of support for typescript needed. Some options:
  - [`ts-protoc-gen`](https://github.com/improbable-eng/ts-protoc-gen#readme)
  - [`ts-proto`](https://github.com/stephenh/ts-proto).

## what does the protobuf schema look like?

See [test.proto](./src/test.proto)

## outstanding questions about protobuf approach

- how will we store and associate the protobuf schema used for a specific submission. We could send `.proto`s in JSON format to the frotend.
- what does schema resolution look like with protobufs - we will need to build our own utilities for this.
