import  brcypt from "bcrypt";
export class UtilsService {
    
    /**
     * Handles to check provided data is empty or not for string , object, array 
     * @param data Data may be any type string | object | array
     * @returns Boolean
     */
    public isEmpty = (data: any | Array<string> | Object | String): Boolean => {
        if (data instanceof Object) {
            if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
                return true;
            } else if (!data) {
                return true;
            }
            return false;
        } else if (data instanceof String) {
            if (!data.trim()) {
                return true;
            }
            return false;
        } else if (typeof (data) === 'undefined') {
            return true;
        } else if (data == null) {
            return true;
        } else {
            return false;
        }
    }

    public generateSalt= async(): Promise<string>  => {
       return await brcypt.genSalt(10);
    }

    public sendEmail = (email: string, emailsubjectLabel: string, emailText: string,) => {
        const message = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: emailsubjectLabel,
            text: emailText
        }

        return message;
    }

    public randomFixedInteger =  (length: number): Number => {
        return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
    }




}