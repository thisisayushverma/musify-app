import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginHandle } from '../features/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogin } from '../reduxSlice/userSlice';
import { store } from '../store/store';

const LoginPage = () => {
  console.log("login calling");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state:any)=>state.user)

  if(isAuthenticated){
    
  }
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<String | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }

    const response = await loginHandle(form).catch((error) => {
      setError(error.message);
      console.log(error);
    })

    if(response){
        console.log(response);
        
        if(response.status === 201){
            dispatch(setUserLogin({user:response.data})); 
            console.log(store.getState());
            navigate('/');
            console.log("code after navigate to home page");
        }
        else if(response.status === 403){
            navigate('/verify-otp',{state:{email:form.email}});
        }
        else if(response.status === 401){
            setError(response.message);
        }
        else {
            setError(response.message);
        }
    }
    // Handle actual login logic here
    console.log('Logging in with', form);
    // navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1e9d4b] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-[#1DB954] mb-6 text-center">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-md transition duration-200"
          >
            Login
          </button>
        </form>

        <p
          onClick={() => navigate('/register')}
          className="mt-5 text-sm text-center text-gray-400 hover:text-white cursor-pointer transition"
        >
          Don’t have an account? <span className="underline">Register</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
