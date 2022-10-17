import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
const Testcase2  = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit=(data)=>{
     data.file=data.file[0].name;
       console.log(data)
      
     axios.post("http://localhost:4328/file/file_upload",data,
     ).then((response)=>{
         console.log(response);
     }).catch((error)=>{
         console.log(error);
     })
    }
    return ( 
        <>
        <div className="page wrapper">
            <h2 className="mt-5">this the test 2 component</h2>
            <h2 className="mt-5">this the test 2 component</h2>
           
            <form className="mx-auto" action="http://localhost:4328/file/file_upload" method="post" enctype='multipart/form-data' >
               <input type="file" name="img" multiple/>
               <input type="file" name="pdf" multiple/>
               <input type="submit" value="submit"/>
           
</form>
        </div>
        </>
     );
}
 
export default Testcase2 ;