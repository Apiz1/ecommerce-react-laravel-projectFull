import React, { useEffect, useState, useRef, useMemo } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { set, useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import JoditEditor from 'jodit-react';


const Create = ({ placeholder }) => {

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [disable, setDisable] = useState(false)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [gallery, setGallery] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const navigate = useNavigate();
  const [sizes, setSizes] = useState([])
  const [sizesChecked, setSizesChecked] = useState([])

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || 'Start typings...'
    }),
    [placeholder]
  );

      const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm();

      const saveProduct = async(data) => {
        const formData = {...data, "description": content, "gallery": gallery}
        setDisable(true);
        const rest = await fetch(`${apiUrl}/products`,{
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer ${adminToken()}`    
                    },
                    body: JSON.stringify(formData)
                }).then(res => res.json())
                .then(result => {
                    setDisable(false);
                    if(result.status = 200){
                        toast.success(result.message);
                        navigate('/admin/products')
                    }else{
                      const formErrors = result.errors;
                      Object,keys(formErrors).forEach((field)=>{
                        setError(field, {message: formErrors[field][0]});
                      })
                       // console.log("Something Went Wrong");
                    }
                    
                })
      }

      const fetchCategories = async() =>{
      const rest = await fetch(`${apiUrl}/categories`,{
                    method: 'GET',
                    headers: {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer ${adminToken()}`    
                    }
                }).then(res => res.json())
                .then(result => {
                  console.log(result)
                    setCategories(result.data)
                })
      }

       const fetchBrands = async() =>{

        const rest = await fetch(`${apiUrl}/brands`,{
                    method: 'GET',
                    headers: {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer ${adminToken()}`    
                    }
                }).then(res => res.json())
                .then(result => {
                  console.log(result)
                    setBrands(result.data)
                })
      }

      const fetchSizes = async() =>{
                  
        const rest = await fetch(`${apiUrl}/sizes`,{
                    method: 'GET',
                    headers: {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer ${adminToken()}`    
                    }
                }).then(res => res.json())
                .then(result => {
                  console.log(result)
                  setSizes(result.data)
                })
      }

      const handleFile = async(e) => {
        const formData = new FormData;
        const file = e.target.files[0];
        formData.append("image",file);
        setDisable(true)

        const rest = await fetch(`${apiUrl}/temp-images`,{
                    method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer ${adminToken()}`    
                    },
                    body: formData
                }).then(res => res.json())
                .then(result => {
                  gallery.push(result.image.id);
                  setGallery([...gallery]);

                  //galleryImages.push(result.image.image_url)
                  setGalleryImages(prev => [...prev, result.image.image_url]);
                  setDisable(false)
                  e.target.value = ""
                })
      }

      const deleteImage = (imageUrl) => {
       const newGallery = galleryImages.filter(gallery=>gallery != imageUrl)
       setGalleryImages(newGallery)
      }

      useEffect(()=>{
        fetchCategories();
        fetchBrands();
        fetchSizes();
      },[])

  return (
    <Layout>
        <div className='container'>
          <div className='row'>
            <div className="d-flex justify-content-between mt-5 pb-3">
              <h4 className="h4 pb-0 mb-0">Products / Create</h4>
              <Link to="/admin/products" className='btn btn-primary'>Back</Link>
              </div>
            <div className='col-md-3'>
                <Sidebar/>
            </div>
            
            <div className='col-md-9'>
            <form onSubmit={handleSubmit(saveProduct)}>
             <div className='card shadow'>
                <div className="card-body p-4">
                  <div className='mb-3'>
                  <label htmlFor="" className='form-label'>
                    Title
                  </label>
                  <input
                  {
                    ...register('title',{
                      required : 'The title field is required'
                    })
                  }
                  type="text"
                   className={`form-control ${errors.title && 'is-invalid'}`}
                   placeholder='Title'></input>
                   {
                      errors.title &&
                      <p className='invalid-feedback'>{errors.title?.message}</p>
                    }

                  </div>
                
                <div className='row'>
                  <div className='col-md-6'>
                  <div className='mb-3'>
                          <label className='form-label' htmlFor="">Category</label>
                          <select 
                          
                          {
                    ...register('category',{
                      required : 'Please Select Category'
                    })
                  }
                           className={`form-control ${errors.category && 'is-invalid'}`}>
                          <option value="">Select a Category</option>
                          {
                            categories && categories.map((category)=>{
                              return(
                                <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                              )
                            })
                          }
                        </select>
                       {
                          errors.category &&
                          <p className='invalid-feedback'>{errors.category?.message}</p>
                       } 

                        </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                       <label className='form-label' htmlFor="">Brand</label>
                          <select
                          
                          {
                          ...register('brand',{
                            required : 'Please select a brand'
                          })
                        }
                       className={`form-control ${errors.brand && 'is-invalid'}`}>
                          <option value="">Select a Brand</option>
                          {
                            brands && brands.map((brand)=>{
                              return(
                                <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                              )
                            })
                          }
                        </select>
                           {
                          errors.brand &&
                          <p className='invalid-feedback'>{errors.brand?.message}</p>
                       } 
                    </div>
                  </div>
                </div>

                 <div className='mb-3'>
                        <label htmlFor="" className='form-label'>
                          Short Description
                        </label>
                        <textarea 
                        {
                          ...register('short_description')
                        }
                        className='form-control' placeholder='Short Description' rows={3}></textarea>
                  </div>

                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'>Description</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Pricing</h3>

                  <div className='row'>
                    <div className='col-md-6'>
                     <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Price</label>
                      <input
                      
                       {
                    ...register('price',{
                      required : 'The Price field is required'
                    })
                  }

                   className={`form-control ${errors.price && 'is-invalid'}`}
                      type="text" placeholder='Price' />
                       {
                          errors.price &&
                          <p className='invalid-feedback'>{errors.price?.message}</p>
                       } 

                     </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Discount Price</label>
                      <input
                      {
                        ...register('compare_price')
                      }
                      type="text" placeholder='Discount Price' className='form-control' />
                     </div>
                    </div>
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Inventory</h3>

                  <div className='row'>
                    <div className='col-md-6'>
                     <div className='mb-3'>
                      <label htmlFor="" className='form-label'>SKU</label>
                      <input
                        
                       {
                    ...register('sku',{
                      required : 'The SKU field is required'
                    })
                  }
                   className={`form-control ${errors.sku && 'is-invalid'}`}
                      type="text" placeholder='SKU' />
                      {
                          errors.sku &&
                          <p className='invalid-feedback'>{errors.sku?.message}</p>
                       } 

                     </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Barcode</label>
                      <input 
                      {
                        ...register('barcode')
                      }
                      type="text" placeholder='Barcode' className='form-control' />
                     </div>
                    </div>
                  </div>

                   <div className='row'>
                    <div className='col-md-6'>
                     <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Qty</label>
                      <input
                      
                        {
                    ...register('qty',{
                      required : 'The Qty field is required'
                    })
                  }
                       className={`form-control ${errors.qty && 'is-invalid'}`}
                      type="text" placeholder='Qty' />
                       {
                          errors.qty &&
                          <p className='invalid-feedback'>{errors.qty?.message}</p>
                       } 

                     </div>
                    </div>

                    <div className='col-md-6'>
                    <div className='mb-3'>
                  <label htmlFor="" className='form-label'>
                    Status
                  </label>
                  <select 
                  {
                    ...register('status',{
                      required : 'Please select a status'
                    })
                  }
                  className={`form-control ${errors.status && 'is-invalid'}`} 
                  >
                    <option value="">select a status</option>
                    <option value="1">Active</option>
                    <option value="0">Block</option>
                  </select>

                  {
                      errors.status &&
                      <p className='invalid-feedback'>{errors.status?.message}</p>
                    }
                     </div>
                    </div>
                  </div>

                    <div className='mb-3'>
                  <label htmlFor="" className='form-label'>
                    Featured
                  </label>
                  <select 
                  {
                    ...register('is_featured',{
                      required : 'This field is required'
                    })
                  }
                  className={`form-control ${errors.is_featured && 'is-invalid'}`} 
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>

                  {
                      errors.status &&
                      <p className='invalid-feedback'>{errors.status?.message}</p>
                    }
                     </div>

                      <div className='mb-3'>
                       <label htmlFor="" className='form-label'>
                      Sizes
                      </label>
                      {
                        sizes&&sizes.map(size => {
                          return( 
                      <div class="form-check-inline ps-2" key={`psize-${size.id}`}>
                        <input 
                        {
                          ...register("sizes")
                        }
                        checked={sizesChecked.includes(size.id)}
                        onChange={(e)=>{
                          if(e.target.checked){
                            setSizesChecked([...sizesChecked,size.id])
                          }else{
                            setSizesChecked(sizesChecked.filter(sid=>size.id !=sid))
                          }
                        }}
                        class="form-check-input" type="checkbox" value={size.id} id={`size-${size.id}`}/>
                        <label class="form-check-label ps-2" htmlFor="{`size-${size.id}`">
                         {size.name}
                      </label>
                      </div>)
                        })
                      }
                     </div>

                  <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                   <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Image</label>
                      <input
                      onChange={handleFile} type="file" placeholder='Qty' className='form-control' />
                     </div>

                    <div className='mb-3'>
                      <div className='row'>
                        {galleryImages.map((imageUrl, index) => {
                            const imageId = gallery[index];               // assuming same order & length
                            return (
                              <div className='col-md-3' key={imageId || index}>   {/* prefer ID, fallback to index */}
                                <div className='card-shadow'>
                                  <img src={imageUrl} alt="" className='w-100'/>
                                  <button className='btn btn-danger' onClick={()=>deleteImage(imageUrl)}>Delete</button>
                                </div>
                              </div>
                            );
                          })}      
                      </div>
                    </div>
                </div>
             </div>
             <button
             disabled = {disable}
             type='submit' className='btn btn-primary mt-3'>Create</button>
          </form>

            </div>

          </div>
        </div>
    </Layout>
  )
}

export default Create