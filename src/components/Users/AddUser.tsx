import React, { ChangeEvent, FormEvent, useState } from "react";
import { IUser } from "../../store/types/user";
import { useActionCreator } from "../../hooks/useActionCreator";
import { useSelector } from "react-redux";

const AddUser = () => {
  const initialValue = {
    id: 0,
    name: "",
    username: "",
    phone: "",
    email: "",
    website: "",
  };
  const { users } = useSelector(
    (store: { user: { users: IUser[] } }) => store.user,
  );
  const [userValue, setUserValue] = useState<IUser>(initialValue);
  const { addUser } = useActionCreator();
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.id;
    const value = event.target.value;
    setUserValue({ ...userValue, [field]: value });
  };
  const addNewUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addUser(userValue);
    setUserValue(initialValue);
  };
  return (
    <form onSubmit={(event) => addNewUser(event)}>
      {Object.keys(users[0]).map((field) => {
        if (field === "company" || field === "id" || field === "address")
          return;
        // Object.keys(USERS[0].company).map(companyField => <input placeholder={companyField}/>)
        return (
          <input
            className="form-control mt-2"
            key={field}
            required
            id={field}
            type={field === "email" ? "email" : "text"}
            value={userValue[field as keyof Pick<IUser, "name" | "username" | "phone" | "email" | "website">]}
            placeholder={`Input user ${field}`}
            onChange={(event) => onChange(event)}
          />
        );
      })}
      <button className="btn btn-success mt-2" type="submit">
        Add User
      </button>
    </form>
  );
};

export default AddUser;
