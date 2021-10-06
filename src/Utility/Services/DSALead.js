import { get } from "../../Utility/httpInterceptor";

export const fetchDSADetails = (objBody = {}) => {
    return get(
        `/cwc-sales/source-types/dsa`, objBody
    ).then((res) => {
        console.log("DSA Fetched....!", res, objBody);
        return res;
    });
};
