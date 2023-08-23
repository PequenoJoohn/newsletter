import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState<string>("");
  const [isSuccess, SetIsSuccess] = useState<boolean>(false);
  const [inputError, setInputError] = useState(false);
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  console.log(windowSize);

  const optionList = [
    "Product discovery and building what matters",
    "Measuring to ensure updates are a success",
    "And much more!",
  ];

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const validateEmail = /^[\w.-]+@[\w.-]+\.\w+$/;

    if (!validateEmail.test(email) || email === "") {
      return setInputError(true);
    }

    SetIsSuccess(true);
  };

  const handleChangeEmail = (response: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(response.target.value);
  };

  const handleReturn = () => {
    setEmail("");
    SetIsSuccess(false);
    setInputError(false);
  };

  return (
    <div className="container">
      {!isSuccess ? (
        // Form
        <div className="container-newsletter">
          {windowSize.current[0] < 959 ? (
            <img src="./images/illustration-sign-up-mobile.svg" alt="" />
          ) : (
            <img src="./images/illustration-sign-up-desktop.svg" alt="" />
          )}

          <div className="container-newsletter-info">
            <h1>Stay updated!</h1>

            <p>Join 60,000+ product managers receiving monthly updates on:</p>

            <ul>
              {optionList.map((option) => (
                <li key={option}>
                  <img src="./images/icon-list.svg" alt="icon list" />
                  <p>{option}</p>
                </li>
              ))}
            </ul>

            <form>
              <label>
                Email address {inputError && <p>Valid email required</p>}
              </label>
              <input
                type="email"
                name="email"
                value={email}
                className={`${inputError && "input-error"}`}
                onChange={(response: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeEmail(response)
                }
                placeholder="email@company.com"
              />

              <button
                type="submit"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleSubmit(event)
                }
              >
                Subscribe to monthly newsletter
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Success
        <div className="container-success">
          <div>
            <img src="./images/icon-success.svg" alt="" />

            <h1>Thanks for subscribing!</h1>

            <p>
              A confirmation email has been sent to <span>{email}</span>. Please
              open it and click the button inside to confirm your subscription.
            </p>

            <button onClick={() => handleReturn()}>Dismiss message</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
