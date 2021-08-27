# Apache Avro

Avro relies on schemas. When Avro data is read or written, the schema is always present.

## `.avsc` file type

`.avsc` extension - holds serialized Avro records along with their schema. [spec](https://avro.apache.org/docs/current/spec.html#Object+Container+Files)

## avro installation/usage notes

`avsc` package
Pure JavaScript implementation of the Avro specification.

More about creating a schema in avro spec [docs](https://avro.apache.org/docs/1.10.2/spec.html#schema_record). See also [`avsc` API docs](https://github.com/mtth/avsc/wiki/API)

_Difference from Avro and other systems:_

> - Dynamic typing: Avro does not require that code be generated.
> - Untagged data: Avro data itself is not tagged with type information. The schema is required to parse data.
> - No manually-assigned field IDs: When a schema changes, both the old and new schema are always present when processing date. Differences are resolved using field `name`.

## what does typescript support look like for avro

No maintained types package. There is a `/types` folder in the `avsc` package which is discussed in this [issue](https://github.com/mtth/avsc/issues/128). Better than nothing but pretty broadly typed - e.g. for [`isValid`](https://github.com/mtth/avsc/wiki/API)

```typescript
isValid: (arg0: any, arg1: {
    errorHook: (path: any) => void;
}) => void
```

## how do you add remove fields over time in the avro approach

There are functions to resolve compatible schemas. See discussion of [createResolver](https://github.com/mtth/avsc/wiki/API#typecreateresolverwritertype-opts) and schema evolution in [asvc docs](https://github.com/mtth/avsc/wiki/Advanced-usage#schema-evolution). This pattern allows comparing subsets of fields within a record.

See avro docs on [schema resolution](https://avro.apache.org/docs/current/spec.html#Schema+Resolution)

## avro tooling

Didn't see any tooling specifically we would need to start using this package as is server side or client side.

## what does the avro schema look like?

See [test.avsc](./src/test.avsc)

## outstanding questions about avro approach

- How much will lack of docs and well defined types be a pain point? Does it matter if we go with a less widely used option like Avro over protobufs - which is well documented in multiple languages, has robust TS support?
- Had trouble debugging issues with avro schema. Error messages were vague, no line numbers. Was harder to find example schemas or discussion of approaches on stackoverflow. Specifically nesting of types (for example, see itemsAmended in `test.avsc`) could be a lot to grok if we plan to nest our data structure within more layers.

## Other readings of interest

> "Personally, I would use Avro for simple domains with mostly primitive types. For rich domains, with complex types and structures, I’ve been using Protocol Buffers for quite some time. Clean domain with no serialization influence is really worth paying the boilerplate code price."

- [Best serialization stategy for event sourcing (compares protobuf and avro directly](https://blog.softwaremill.com/the-best-serialization-strategy-for-event-sourcing-9321c299632b)
- [Kafka with avro versus Kafka with protobuf - gets into schema evolution](https://simon-aubury.medium.com/kafka-with-avro-vs-kafka-with-protobuf-vs-kafka-with-json-schema-667494cbb2af)
