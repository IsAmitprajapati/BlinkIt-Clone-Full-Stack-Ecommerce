import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js"; 

const isValidPincode = (pincode) => /^[1-9]\d{5}$/.test(String(pincode ?? ""));

export const addAddressController = async(request,response)=>{
    try {
        const userId = request.userId // middleware
        const { address_line , city, district, state, pincode, country,mobile } = request.body

        if (!isValidPincode(pincode)) {
            return response.status(400).json({
                message : "Enter a valid 6-digit Indian PIN code",
                error : true,
                success : false
            })
        }

        const createAddress = new AddressModel({
            address_line,
            city,
            district,
            state,
            country,
            pincode,
            mobile,
            userId : userId 
        })
        const saveAddress = await createAddress.save()

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId,{
            $push : {
                address_details : saveAddress._id
            }
        })

        return response.json({
            message : "Address Created Successfully",
            error : false,
            success : true,
            data : saveAddress
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getAddressController = async(request,response)=>{
    try {
        const userId = request.userId // middleware auth

        const data = await AddressModel.find({ userId : userId }).sort({ createdAt : -1})

        return response.json({
            data : data,
            message : "List of address",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}

export const updateAddressController = async(request,response)=>{
    try {
        const userId = request.userId // middleware auth 
        const { _id, address_line,city,district,state,country,pincode, mobile } = request.body

        if (!isValidPincode(pincode)) {
            return response.status(400).json({
                message : "Enter a valid 6-digit Indian PIN code",
                error : true,
                success : false
            })
        }

        const updateAddress = await AddressModel.updateOne({ _id : _id, userId : userId },{
            address_line,
            city,
            district,
            state,
            country,
            mobile,
            pincode
        })

        return response.json({
            message : "Address Updated",
            error : false,
            success : true,
            data : updateAddress
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteAddresscontroller = async(request,response)=>{
    try {
        const userId = request.userId // auth middleware    
        const { _id } = request.body 

        const disableAddress = await AddressModel.updateOne({ _id : _id, userId},{
            status : false
        })

        return response.json({
            message : "Address remove",
            error : false,
            success : true,
            data : disableAddress
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

