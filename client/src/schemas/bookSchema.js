import SimpleSchema from 'simpl-schema';

const bookSchema = function (editingId) {
  const schema = {
    name: {
      type: String,
      min: 3,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true,
      minCount: 1
    },
    "categories.$": { type: String },
  }
  if (!editingId) {
    schema.bookImage = {
      type: String,
      required: true,
    }
  }
  return new SimpleSchema(schema);
}


export default bookSchema;