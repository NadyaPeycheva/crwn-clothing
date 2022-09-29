
import SingUpForm from "../../components/sing-up-form/sing-up-form.component";
import SingInForm from "../../components/sing-in-form/sing-in-form.component";

import './authentication.style.scss'
const Authentication = () => {
  

  return (
    <div className='authentication-container'>
      <SingInForm />
       <SingUpForm />
    </div>
  );
};
export default Authentication;
