import { get, post } from "../../Utility/httpInterceptor";

export const updateLeadByLeadId = (objBody = {}) => {
    return post(
        `/cwc-sales/lead/addLead`, objBody
    ).then((res) => {
        console.log("Updated Successfull....!", res, objBody);
        return res;
    });
};