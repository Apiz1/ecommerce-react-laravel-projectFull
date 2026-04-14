import React, { useContext } from 'react'
import Layout from './common/Layout'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from './common/http';
import { toast } from 'react-toastify';
import { AuthContext } from './context/Auth';

const Login = () => {
     const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const {login} = useContext(AuthContext);
      const navigate = useNavigate();

  const onSubmit = async (data) => {
      
      try {
        const res = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await res.json();
  
        // Recommended way to check success
        if (res.ok) {  // 200–299 range
          const userInfo = {
            token: result.token,
            id: result.id,
            name: result.name,
          };
  
          // Fix: stringify the actual object!
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
  
          // Optional: also save token separately if you use it often
          // localStorage.setItem('token', result.token);
  
          toast.success('Login successful!');
          login(userInfo);
          navigate('/account');
        } else {
          // 401, 422, 500 etc...
          toast.error(result.message || 'Login failed. Please try again.');
        }
      } catch (err) {
        console.error('Login error:', err);
        toast.error('Something went wrong. Please check your connection.');
      }
    };
    
  return (
    <Layout>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden" 
             style={{ 
               maxWidth: '420px', 
               width: '100%',
               background: 'white'
             }}>
          <div className="card-body p-4 p-md-5">
            <h3 className="text-center mb-4 fw-bold text-primary">Login</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} noValidate>


              <div className="mb-4">
                <label className="form-label fw-medium">Email address</label>
                  <input
                  {...register('email',{
                      required: "The email field is required",
                      pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                      } 
                  })}
                  type="email"
                  className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="name@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="invalid-feedback mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>



              <div className="mb-4">
                <label className="form-label fw-medium">Password</label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <div className="invalid-feedback mt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="d-grid gap-2 mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg fw-medium"
                >
                 Register
                </button>
              </div>

              {/* Optional small links - looks professional */}
              <div className="text-center mt-4">
                <small className="text-muted">
                 Don't have an account ? <a href="/account/register" className="text-decoration-none text-primary">Register</a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login