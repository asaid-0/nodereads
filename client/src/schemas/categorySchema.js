import SimpleSchema from "simpl-schema";

const schema = {
  name: {
    type: String,
    min: 3,
    required: true
  }
}

const categorySchema = new SimpleSchema(schema)

export default categorySchema;