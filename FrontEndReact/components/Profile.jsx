import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import UserSidebar from './common/UserSidebar'
import { useForm } from 'react-hook-form'
import { apiUrl, userToken } from './common/http'
import { toast } from 'react-toastify'
import Loader from './common/Loader'

const Profile = () => {

  const [loading, setLoading] = useState(false)

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      city: "",
      state: "",
      zip: "",
      mobile: "",
    },
  });

  useEffect(() => {
    fetch(`${apiUrl}/get-profile-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`, // remove the space after 'Authorization'
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // populate form fields with API result
        reset({
          name: result.data.name,
          email: result.data.email,
          address: result.data.address,
          city: result.data.city,
          state: result.data.state,
          zip: result.data.zip,
          mobile: result.data.mobile
        });
      })
      .catch((err) => console.error(err));
  }, [reset]);

  const updateAccount = async (data) => {
    fetch(`${apiUrl}/update-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`, // remove the space after 'Authorization'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.status == 200){
          toast.success(result.message);
        }else{
            const formErrors = result.errors;
            Object,keys(formErrors).forEach((field)=>{
              setError(field, {message: formErrors[field][0]});
            })
        }
      })
  }


  return (
    <Layout>
        <div className='container'>
          <div className='row'>
            <div className="d-flex justify-content-between mt-5 pb-3">
              <h4 className="h4 pb-0 mb-0">My Account</h4>
              </div>
            <div className='col-md-3'>
                <UserSidebar/>
            </div>
            <div className='col-md-9'>
               {
              loading == true && <Loader/>
            }
            {
              loading == false &&
            
              <form onSubmit={handleSubmit(updateAccount)}>
             <div className='card shadow'>
                <div className="card-body p-4">
                  <div className='row'>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input 
                        {
                          ...register('name',{required: "The name field required."})
                        }
                        type="text" id='name' className={`form-control ${errors.name && 'is-invalid'}`} placeholder='Enter Name' />
                        {errors.name && <p className='text-danger'>{errors.name?.message}</p>}
                      </div>
                      <div className='mb-3  col-md-6'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input 
                          {...register('email',{
                              required: "The email field is required",
                              pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            } 
                        })}
                        type="text" id='email' className={`form-control ${errors.email && 'is-invalid'}`} placeholder='Enter Email' />
                        {errors.email && <p className='text-danger'>{errors.email?.message}</p>}
                    </div>
                  </div>

                   <div className='row'>
                    <div className='mb-3'>
                        <label htmlFor="address" className='form-label'>Address</label>
                        <textarea 
                        {
                          ...register('address',{required: "The address field required."})
                        }
                        id="address" placeholder='Address' className={`form-control ${errors.address && 'is-invalid'}`}></textarea>
                        {errors.address && <p className='text-danger'>{errors.address?.message}</p>}
                      </div>
                  </div>

                  <div className='row'>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="mobile" className='form-label'>Phone</label>
                        <input 
                        {
                          ...register('mobile',{required: "The phone field required."})
                        }
                        type="text" id='mobile' className={`form-control ${errors.mobile && 'is-invalid'}`} placeholder='Enter Phone Number' />
                        {errors.mobile && <p className='text-danger'>{errors.mobile?.message}</p>}
                      </div>
                      <div className='mb-3  col-md-6'>
                        <label htmlFor="city" className='form-label'>City</label>
                        <input 
                        {
                          ...register('city',{required: "The city field required."})
                        }
                        type="text" id='city' className={`form-control ${errors.city && 'is-invalid'}`} placeholder='Enter Email' />
                        {errors.city && <p className='text-danger'>{errors.city?.message}</p>}
                    </div>
                  </div>

                  <div className='row'>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="state" className='form-label'>State</label>
                        <input 
                        {
                          ...register('state',{required: "The state field required."})
                        }
                        type="text" id='state' className={`form-control ${errors.state && 'is-invalid'}`} placeholder='Enter State' />
                        {errors.state && <p className='text-danger'>{errors.state?.message}</p>}
                      </div>
                      <div className='mb-3  col-md-6'>
                        <label htmlFor="zip" className='form-label'>Zip</label>
                        <input 
                        {
                          ...register('zip',{required: "The zip field required."})
                        }
                        type="text" id='zip' className={`form-control ${errors.zip && 'is-invalid'}`} placeholder='Enter Zip' />
                        {errors.zip && <p className='text-danger'>{errors.zip?.message}</p>}
                    </div>
                  </div>
                </div>
             </div>
              <button className='btn btn-primary mt-4 mb-5'>Update</button>
              </form>
              }
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Profile