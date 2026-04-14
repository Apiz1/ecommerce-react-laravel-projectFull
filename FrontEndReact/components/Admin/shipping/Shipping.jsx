import React, { useState } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

const Shipping = () => {

    const[disable, setDisable] = useState(false)
      const navigate = useNavigate();
      const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues:async() =>{
            await fetch(`${apiUrl}/get-shipping`,{
                    method: 'GET',
                    headers: {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer ${adminToken()}`    
                    }
                }).then(res => res.json())
                .then(result => {
                    if(result.status = 200){
                        reset({
                            shipping_charge:result.data.shipping_charge
                        })
                    }else{
                        console.log("Something Went Wrong");
                    }
                    
                })
        }
      });

      const saveShipping = async(data) => {
        setDisable(true);
        console.log(data)
        const rest = await fetch(`${apiUrl}/save-shipping`,{
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer ${adminToken()}`    
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                .then(result => {
                    setDisable(false);
                    if(result.status = 200){
                        toast.success(result.message);
                        navigate('/admin/shipping')
                    }else{
                        console.log("Something Went Wrong");
                    }
                    
                })
      }

  return (
    <Layout>
        <div className='container'>
          <div className='row'>
            <div className="d-flex justify-content-between mt-5 pb-3">
              <h4 className="h4 pb-0 mb-0">Shipping</h4>
              <Link to='/admin/categories' className='btn btn-primary'>Back</Link>
              </div>
            <div className='col-md-3'>
                <Sidebar/>
            </div>
            <div className='col-md-9'>
            <form onSubmit={handleSubmit(saveShipping)}>
             <div className='card shadow'>
                <div className="card-body p-4">
                  <div className='mb-3'>
                  <label htmlFor="" className='form-label'>
                    Shipping Charges
                  </label>
                  <input
                  {
                    ...register('shipping_charge',{
                      required : 'The shipping charge field is required'
                    })
                  }
                  type="text"
                   className={`form-control ${errors.shipping_charge && 'is-invalid'}`}
                   placeholder='Shipping Charges'></input>
                   {
                      errors.shipping_charge &&
                      <p className='invalid-feedback'>{errors.shipping_charge?.message}</p>
                    }

                  </div>

                </div>
             </div>
             <button
             disabled = {disable}
             type='submit' className='btn btn-primary mt-3'>Save</button>
          </form>

            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Shipping