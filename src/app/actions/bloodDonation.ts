'use server'
import baseUrl from "@/lib/api/baseUrl";
import BloodRequestType from "@/lib/types/bloodRequestType";

export const requestForBlood = async (data: BloodRequestType) => {
    console.log("requestForBlood")
    console.log(data)
    try {
       const response = await baseUrl("/blood_request/request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
       }) 

    //    if(!response.ok) {
    //     throw new Error("কিছু ভুল হয়েছে")
    //    }

       return await response.json()
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "কিছু ভুল হয়েছে"
        }
    }
}
