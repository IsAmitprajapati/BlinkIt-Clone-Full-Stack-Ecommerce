import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider'
import { getSimdegaLocality, SIMDEGA_LOCALITIES } from '../data/simdegaLocations'

const AddAddress = ({close}) => {
    const { register, handleSubmit,reset,setValue,formState : { errors } } = useForm()
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async(data)=>{
        console.log("data",data)
    
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data : {
                    address_line :data.addressline,
                    city : data.city,
                    district : data.district,
                    state : data.state,
                    country : data.country,
                    pincode : data.pincode,
                    mobile : data.mobile
                }
            })

            const { data : responseData } = response
            
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    const cityField = register("city",{required : true})
  return (
    <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto'>
        <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
            <div className='flex justify-between items-center gap-4'>
                <h2 className='font-semibold'>Add Address</h2>
                <button onClick={close} className='hover:text-red-500'>
                    <IoClose  size={25}/>
                </button>
            </div>
            <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-1'>
                    <label htmlFor='addressline'>Address Line :</label>
                    <input
                        type='text'
                        id='addressline' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("addressline",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='city'>Town / village / locality :</label>
                    <input
                        type='text'
                        id='city' 
                        list='simdega-localities'
                        placeholder='Choose or type a town, village, or locality'
                        className='border bg-blue-50 p-2 rounded'
                        {...cityField}
                        onChange={(event) => {
                            cityField.onChange(event)
                            const locality = getSimdegaLocality(event.target.value)
                            if (locality) {
                                setValue("district", "Simdega")
                                setValue("state", "Jharkhand")
                                setValue("country", "India")
                                setValue("pincode", locality.pincode)
                            }
                        }}
                    />
                    <datalist id='simdega-localities'>
                        {SIMDEGA_LOCALITIES.map((locality) => (
                            <option key={locality.name} value={locality.name} />
                        ))}
                    </datalist>
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='district'>District :</label>
                    <input
                        type='text'
                        id='district'
                        className='border bg-blue-50 p-2 rounded'
                        {...register("district")}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='state'>State :</label>
                    <input
                        type='text'
                        id='state' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("state",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='pincode'>Pincode :</label>
                    <input
                        type='text'
                        id='pincode' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("pincode",{
                            required : "PIN code is required",
                            pattern : { value : /^[1-9]\d{5}$/, message : "Enter a valid 6-digit Indian PIN code" }
                        })}
                    />
                    {errors.pincode && <p className='text-red-500 text-sm'>{errors.pincode.message}</p>}
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='country'>Country :</label>
                    <input
                        type='text'
                        id='country' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("country",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='mobile'>Mobile No. :</label>
                    <input
                        type='text'
                        id='mobile' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("mobile",{required : true})}
                    />
                </div>

                <button type='submit' className='bg-primary-200 w-full  py-2 font-semibold mt-4 hover:bg-primary-100'>Submit</button>
            </form>
        </div>
    </section>
  )
}

export default AddAddress
