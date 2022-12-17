import React from "react";
import { FormRegister } from "../components/FormRegister";

const Register = () => {
  return (
    <div className="container-xl p-4 align-items-center justify-content-center">
      <div className="row background g-1 p-4">
        <div className="col p-4">
          <FormRegister />
        </div>
      </div>
    </div>
  );
};

export default Register;
