import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as yup from 'yup';
import { PasswordEyeOpen, PasswordEyeClosed } from '../ui/PasswordEye';

//yup validation schema
const schema = yup.object().shape({
    userName: yup
        .string()
        .trim()
        .required("username is required")
        .matches(/^[a-zA-Z0-9._-]*$/, "please enter a valid username"),
    userPassword: yup
        .string()
        .required("password is required")
        .min(6, "password must be at least 6 characters")

});

function LoginForm() {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errors, setErrors] = useState({}); // for Yup validation errors
    const { login, error, setError, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();


    const clearAuthError = () => {
        if (error) {
            setError(null);
        }
    };

    const handleUserName = (event) => {
        setUserName(event.target.value);
        if (errors.userName) {
            setErrors((prev) => ({ ...prev, userName: null }));
        }
    };

    const handleUserPassword = (event) => {
        setUserPassword(event.target.value);
        if (errors.userPassword) {
            setErrors((prev) => ({ ...prev, userPassword: null }));
        }
    };

    const validateUser = async (event) => {
        event.preventDefault();
        clearAuthError();
        setErrors({}); // clear previous errors if any

        // removing whitespace
        const sanitizedUserName = userName.trim();
        const sanitizedUserPassword = userPassword;

        try {
            // validate form inputs
            await schema.validate(
                { userName: sanitizedUserName, userPassword: sanitizedUserPassword },
                { abortEarly: false }
            );

            const success = await login(sanitizedUserName, sanitizedUserPassword);

            if (success) {
                nav("/home");
            }
        } catch (validationError) {
            // Collect all field level errors
            const validationErrors = {};
            validationError.inner.forEach((error) => {
                if (!validationErrors[error.path])
                    validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={validateUser} noValidate>
            <div className="input-group">
                <input
                    type="text"
                    name="userName"
                    value={userName}
                    placeholder="username"
                    onChange={handleUserName}
                    onFocus={clearAuthError}
                    className={errors.userName ? "error-input" : ""}
                    aria-invalid={!!errors.userName}
                    aria-describedby="userName-error"
                    autoComplete="username"
                    autoFocus
                />
            </div>
            {errors.userName && (
                <p id="userName-error" className="error-message">
                    {errors.userName}
                </p>
            )}

            <div className="input-group">
                <input
                    type={showPassword ? "text" : "password"}
                    name="userPassword"
                    value={userPassword}
                    placeholder="password"
                    onChange={handleUserPassword}
                    onFocus={clearAuthError}
                    className={`password-input ${errors.userPassword ? "error-input" : ""}`}
                    aria-invalid={!!errors.userPassword}
                    aria-describedby="userPassword-error"
                    autoComplete="current-password"
                />

                <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <PasswordEyeClosed /> : <PasswordEyeOpen />}
                </button>
            </div>

            {errors.userPassword && (
                <p id="userPassword-error" className="error-message">
                    {errors.userPassword}
                </p>
            )}
            
            <button className="primary-btn " type="submit" disabled={loading} aria-busy={loading}>
                {loading ? "Logging in..." : "Log in"}
            </button>

            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default LoginForm;
