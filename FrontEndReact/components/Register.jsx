import React from 'react'
import Layout from './common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './common/Sidebar'
import { useForm } from 'react-hook-form'
import { apiUrl } from './common/http'
import { toast } from 'react-toastify'

const Register = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
      
      try {
        const res = await fetch(`${apiUrl}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await res.json();
  
        // Recommended way to check success
        if (res.ok) {  // 200–299 range
          toast.success(result.message);
          navigate('/account/login');
        } else {
         // toast.error(result.message || 'Login failed. Please try again.');
          const formErrors = result.errors;
          Object,keys(formErrors).forEach((field)=>{
            setError(field, {message: formErrors[field][0]});
          })
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
            <h3 className="text-center mb-4 fw-bold text-primary">Register</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <div className="mb-4">
                <label className="form-label fw-medium">Name</label>
                  <input
                  {...register('name',{
                      required: "The name field is required",
                  })}
                  type="text"
                  className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="name"
                  autoComplete="name"
                />
                {errors.email && (
                  <div className="invalid-feedback mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>


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
                 Already have an account ? <a href="/account/login" className="text-decoration-none text-primary">Login</a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Register