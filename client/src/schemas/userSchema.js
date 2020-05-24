import SimpleSchema from "simpl-schema";

SimpleSchema.setDefaultMessages({
    messages: {
      en: {
        passwordMismatch: 'Passwords do not match',
      },
    },
  });


export default new SimpleSchema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    email: {
        type: SimpleSchema.RegEx.Email,
        required: true
    },
    password: {
        type: String,
        required: true,
        label: "Enter a password",
        min: 8,
    },
    confirmPassword: {
        type: String,
        required: true,
        label: "Enter the password again",
        min: 8,
        custom() {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        },
    },
    userPhoto: {
        type: String,
        required: true
    }

});