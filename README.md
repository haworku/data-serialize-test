# data-serialize-test

Comparing protobuf (Google) and avro (Apache) with some contrived examples

## Why

We have data stored in complex structures that is changing over time. We want to easily understand the structure of the data at the time it was stored by referencing a schema. Also want to be able to read the schema both client-side and server-side since both areas of the app need to reference the structure of the data.

## Comparison checklist

- file type
- installation/usage notes
- what does typescript support look like
- how do you add remove fields over time
- how to store schema and data in db
- tooling
- what does the schema look like?
- outstanding questions

## Google Protobuf

see [notes](./protobuf.md)

## Apache Avro

see [notes](./avro.md)
