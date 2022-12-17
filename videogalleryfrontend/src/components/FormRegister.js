import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const FormRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  async function registUser(data) {
    const dataUser = {
      userName: data.userName,
      userLastName: data.userLastName,
      userPassword: data.userPassword,
      userEmail: data.userEmail,
    };
    const response = await fetch("http://localhost:8080/user/registerUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataUser),
    });
    const dataBackend = await response.json();

    if (dataBackend.message !== "Email already registered") {
      navigate("/verification", {state: { userId: dataBackend.userId}})
    } else {
      setResponse(dataBackend.response);
    }
  }

  return (
    <form className="row p-2 text-white" onSubmit={handleSubmit(registUser)}>
      <div className="col-12 p-2">
        <h3 className="fw-bolder">Register form</h3>
      </div>
      <div className="col-6 p-2">
        <label htmlFor="userName" className="form-label fw-bolder">
          Name:
        </label>
        <input
          type="text"
          className="form-control border-dark"
          name="userName"
          id="userName"
          autoComplete="nope"
          {...register("userName", {
            required: true,
          })}
        />
        {errors.userName?.type === "required" && (
          <div className="text-danger">
            <small>This field is required.</small>
          </div>
        )}
      </div>
      <div className="col-6 p-2">
        <label htmlFor="userLastName" className="form-label fw-bolder">
          Last Name:
        </label>
        <input
          type="text"
          className="form-control border-dark"
          name="userLastName"
          id="userLastName"
          autoComplete="nope"
          {...register("userLastName", {
            required: true,
          })}
        />
        {errors.userLastName?.type === "required" && (
          <div className="text-danger">
            <small>This field is required.</small>
          </div>
        )}
      </div>
      <div className="col-6 p-2">
        <label htmlFor="userPassword" className="form-label fw-bolder">
          Password:
        </label>
        <input
          type="password"
          className="form-control border-dark"
          name="userPassword"
          id="userPassword"
          autoComplete="nope"
          {...register("userPassword", { required: true, minLength: 8 })}
        />
        {errors.userPassword?.type === "required" && (
          <div className="text-danger">
            <small>This field is required.</small>
          </div>
        )}
        {errors.userPassword?.type === "minLength" && (
          <div className="text-danger">
            <small>The min length its 8 characters.</small>
          </div>
        )}
      </div>
      <div className="col-6 p-2">
        <label htmlFor="userRePassword" className="form-label fw-bolder">
          Repeat Password:
        </label>
        <input
          type="password"
          className="form-control border-dark"
          name="userRePassword"
          id="userRePassword"
          autoComplete="nope"
          {...register("userRePassword", {
            required: true,
            validate: (value) => value === watch("userPassword"),
          })}
        />
        {errors.userRePassword?.type === "required" && (
          <div className="text-danger">
            <small>This field is required.</small>
          </div>
        )}
        {errors.userRePassword?.type === "validate" && (
          <div className="text-danger">
            <small>Passwords not match.</small>
          </div>
        )}
      </div>
      <div className="col-12 p-2">
        <label htmlFor="userEmail" className="form-label fw-bolder">
          Email:
        </label>
        <input
          type="email"
          className="form-control border-dark"
          name="userEmail"
          id="userEmail"
          placeholder="example@email.com"
          autoComplete="nope"
          {...register("userEmail", {
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />
        {errors.userEmail?.type === "pattern" && (
          <div className="text-danger">
            <small>Ingrese una dirección de correo valida.</small>
          </div>
        )}
        {errors.userEmail?.type === "required" && (
          <div className="text-danger">
            <small>This field is required.</small>
          </div>
        )}
      </div>
      <div className="d-grid col-4 mx-auto p-2 my-2">
        <button className="btn btn-dark" type="submit">
          Regist
        </button>
      </div>
      {response && (
        <div className="text-danger text-center">
          <p className="fs-6">{response}</p>
        </div>
      )}
    </form>
  );
};
