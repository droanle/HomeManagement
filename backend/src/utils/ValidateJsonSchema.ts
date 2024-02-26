import Ajv, { JSONSchemaType } from "ajv";

export default function ValidateJsonSchema(
  data: unknown,
  schema: JSONSchemaType<unknown>
) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    throw ajv.errorsText(validate.errors);
  }
}
