import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
// import.meta.env
const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const getPasswords = async () => {
    let req = await fetch("https://passkey-backend-version-11.onrender.com/");
    const passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  };
  useEffect(() => {
    getPasswords();
  }, []);

  const ref = useRef();
  const passwordRef = useRef();

  const copyText = (text) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      passwordRef.current.type = "password";
      ref.current.src = "icons/eye.png";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };
  
  // const savePassword = async () => {

  //   if (
  //     form.site.length > 3 &&
  //     form.username.length > 3 &&
  //     form.password.length > 3
  //   ) {
  //     // console.log(form)
  //     // await fetch("https://passkey-backend-version-11.onrender.com/", {
  //     //   method: "DELETE",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify({ id: form.id }),
  //     // });
      
  //     const newPassword = { ...form, id: uuidv4() }; // Generate UUID once

  //     // Update state and localStorage
  //     const updatedArray = [...passwordArray, newPassword];
  //     setpasswordArray(updatedArray);
  //     await fetch("https://passkey-backend-version-11.onrender.com/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ ...form, id: uuidv4() }),
  //     });
  //     setform({ site: "", username: "", password: "" });
  //     toast("Password Saved!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  //   } else {
  //     toast("Data Invalid!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  //   }
  // };
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      try {
        if (form.id) {
          // Exclude `_id` from the request payload
          const { id, site, username, password } = form;
          const response = await fetch(`https://passkey-backend-version-11.onrender.com/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ site, username, password }),
          });
  
          if (!response.ok) {
            throw new Error("Failed to update password");
          }
          toast.success("Password Updated!", { theme: "dark" });
        } else {
          // For new passwords
          const newPassword = { ...form, id: uuidv4() };
          const response = await fetch("https://passkey-backend-version-11.onrender.com/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPassword),
          });
  
          if (!response.ok) {
            throw new Error("Failed to save password");
          }
          toast.success("Password Saved!", { theme: "dark" });
        }
  
        // Refresh the password list
        await getPasswords();
        setform({ site: "", username: "", password: "", id: null });
      } catch (error) {
        toast.error("Error saving password", { theme: "dark" });
      }
    } else {
      toast.error("Data Invalid!", { theme: "dark" });
    }
  };
  
  const deletePassword = async (id) => {
    if (confirm("Do you really want to delete this password?")) {
      const updatedArray = passwordArray.filter((item) => item.id !== id);
      setpasswordArray(updatedArray);
      let res = await fetch("https://passkey-backend-version-11.onrender.com/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setform({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="dark"
        transition="Bounce"
      />
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-3 md:p-0 md:myContainer min-h-[83.5vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">Key/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full text-black p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 text-black w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 text-black w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className=" w-fit flex justify-center gap-2 items-center bg-green-400 rounded-full px-8 py-2 hover:bg-green-300 border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <a
                            href={item.site}
                            target="_blank"
                            className="flex items-center justify-center space-x-2"
                          >
                            <span>{item.site}</span>
                          </a>
                          <img
                            onClick={() => copyText(item.site)}
                            width={23}
                            src="https://img.icons8.com/?size=100&id=g2NIFWmCR7CE&format=png&color=000000"
                            alt="copy icon"
                            className="inline align-middle ml-2 cursor-pointer"
                          />
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span className="mr-1">{item.username}</span>
                          <img
                            onClick={() => copyText(item.username)}
                            width={23}
                            src="https://img.icons8.com/?size=100&id=g2NIFWmCR7CE&format=png&color=000000"
                            alt="username icon"
                            className="inline align-middle ml-2 cursor-pointer"
                          />
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span className="mr-1">
                            {"*".repeat(item.password.length)}
                          </span>
                          <img
                            onClick={() => copyText(item.password)}
                            width={23}
                            src="https://img.icons8.com/?size=100&id=g2NIFWmCR7CE&format=png&color=000000"
                            alt="password icon"
                            className="inline align-middle ml-2 cursor-pointer"
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#242424,secondary:#000000"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
