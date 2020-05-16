import SimpleSchema from "simpl-schema";

const authorSchema = function (editingId) {
  const schema= {
    firstname: {
      type: String,
      min: 3,
      required: true
    },
    lastname: {
      type: String,
      min: 3,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
  }
  if (!editingId){
    schema.authorImage = {
      type: String,
      required: true
    }
  }

  return new SimpleSchema(schema)
};

export default authorSchema;