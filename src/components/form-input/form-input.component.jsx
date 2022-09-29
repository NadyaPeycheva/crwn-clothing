import { FormInputLave, Input, Group } from "./form-input.style.jsx";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input className="form-input" {...otherProps} />
      {label && (
        <FormInputLave shrink={otherProps.value.length}>{label}</FormInputLave>
      )}
    </Group>
  );
};
export default FormInput;
