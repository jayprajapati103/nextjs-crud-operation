"use client";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { FormEventHandler, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signin = () => {
  // const providers = await getProviders();

  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const handletoChange = (e: any) => {
    console.log("Changed");
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  // console.log("Session", myses);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: userInfo.email,
      password: userInfo.password,
    });

    if (res?.error) {
      setError(res.error);

      console.error("Login failed:", res.error);
    } else {
      alert("Login successful");
      // router.push("/users");
    }
  };
  // const [visibilityOfPwd, setvisibilityOfPwd] = useState(false);
  // const handlePasswordVisibility = () => {
  //   setvisibilityOfPwd(!visibilityOfPwd);
  // };

  //Authenticate to user
  const { data, status } = useSession();
  if (status === "loading") {
    return <h1>Loading</h1>;
  }
  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div>
      <h1 className="text-center">Sign in</h1>
      <Form
        className="d-flex flex-column align-items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => handletoChange(e)}
              value={userInfo?.email}
            />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              // type={visibilityOfPwd ? "text" : "password"}
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handletoChange(e)}
              value={userInfo?.password}
              className="pr-5"
            />
            {/* <FontAwesomeIcon
              icon={visibilityOfPwd ? faEye : faEyeSlash}
              className="position-absolute"
              style={{
                top: "34%",
                right: "39%",
                cursor: "pointer",
                transform: "translateY(-50%)",
              }}
              onClick={handlePasswordVisibility}
            /> */}
          </Form.Group>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button variant="primary" type="submit" className="w-100">
            Signin
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signin;
