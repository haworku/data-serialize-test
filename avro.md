# Apache Avro

Avro relies on schemas. When Avro data is read or written, the schema is always present.

## `.avsc` file type

`.avsc` extension - holds serialized Avro records along with their schema. [spec](https://avro.apache.org/docs/current/spec.html#Object+Container+Files)

## avro installation/usage notes

`avsc` package
Pure JavaScript implementation of the Avro specification.

More about creating a schema in avro spec [docs](https://avro.apache.org/docs/1.10.2/spec.html#schema_record). See also [`avsc` API docs](https://github.com/mtth/avsc/wiki/API)

## what does typescript support look like for avro

No maintained types package. There is a `/types` folder in the `avsc` package which is discussed in this [issue](https://github.com/mtth/avsc/issues/128). Better than nothing but pretty broadly typed - e.g. for [`isValid`](https://github.com/mtth/avsc/wiki/API)

```typescript
isValid: (arg0: any, arg1: {
    errorHook: (path: any) => void;
}) => void
```

## how do you add remove fields over time in the avro approach

Data is encoded using a schema (the writers schema) and then _can_ be decoded in a different schema (the readers schema). For more on how compatibility of schema's are determine see avro docs on [schema resolution](https://avro.apache.org/docs/current/spec.html#Schema+Resolution).

Basics:

- When a schema changes, differences are resolved using field `name`. Schema resolution matches up the fields by field name, if a field is missing in writers schema, the default value in the readers schema is used there.
- There are functions to resolve compatible schemas. See discussion of [createResolver](https://github.com/mtth/avsc/wiki/API#typecreateresolverwritertype-opts) and schema evolution in [asvc docs](https://github.com/mtth/avsc/wiki/Advanced-usage#schema-evolution). This pattern allows comparing subsets of fields within a record.
- `null` is not an acceptable default in Avro: if you want to allow a field to be null, you have to use a union type. Reworded: you can only use null as a default value if it is one of the branches of the union
- Changing the datatype of a field is possible, provided that Avro can convert the type
- Changing the name is possible but using name alias (backward comptabile but not forward compatible)

## how to store avro schema in db

Avro schemas + data can be stored as a binary in a [object container file](https://avro.apache.org/docs/current/spec.html#Object+Container+Files). These self describing files contain serialized data (could be many records) with the metadata/schema in one place.

## avro tooling

Didn't see any tooling specifically we would need to start using this package on server side or client side besides adding types compilation.

## what does the avro schema look like?

See [test.avsc](./src/test.avsc)

## outstanding questions about avro approach

- How much will lack of docs and well defined types be a pain point? Does it matter if we go with a less widely used option like Avro over protobufs - which is well documented in multiple languages, has robust TS support?
- Had trouble debugging issues with avro schema. Error messages were vague, no line numbers. Was harder to find example schemas or discussion of approaches on stackoverflow. Specifically nesting of types (for example, see itemsAmended in `test.avsc`) could be a lot to grok if we plan to nest our data structure within more layers.

## Other readings of interest

- Book: O'Reilly [Designing Data intensive Applications](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiUktGL5O3yAhVhFVkFHQfVA54QFnoECBgQAQ&url=https%3A%2F%2Fwww.oreilly.com%2Flibrary%2Fview%2Fdesigning-data-intensive-applications%2F9781491903063%2F&usg=AOvVaw1f9NqV8I80qN-JlliMetDg)
  - See section on Encoding and Evolution which compares Protobuf and Avro along with other data serialization approaches and their use case
- [Best serialization stategy for event sourcing](https://blog.softwaremill.com/the-best-serialization-strategy-for-event-sourcing-9321c299632b)
- [Kafka with avro versus Kafka with protobuf - gets into schema evolution](https://simon-aubury.medium.com/kafka-with-avro-vs-kafka-with-protobuf-vs-kafka-with-json-schema-667494cbb2af)
