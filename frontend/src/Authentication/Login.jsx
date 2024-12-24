import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import { Context } from '../context';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For redirecting after successful login
    const { setstate ,id,setid} = useContext(Context); // Assuming `Context` provides a state updater

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost/backend/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                // Store the role and user data in localStorage and context
                localStorage.setItem('role', data.role);  // Store the role returned by the server
                setstate(data.role);  // Update state with the user's role
                alert('Login successful! AS ' + data.role );
                console.log(data.teacherId)
                // Redirect based on role returned from the backend
                if (data.role === 'admin') {
                    navigate('/');
                } else if (data.role === 'teacher') {
                    navigate('/t/overview');

setid(data.teacherId)

                } else if (data.role === 'student') {
                    navigate('/s');

setid(data.studentId)
CONSOLE.LOG(data.studentId)
                }
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100">
            <h2 className='font-extrabold m-2'>You Are Only One Step Away</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;


