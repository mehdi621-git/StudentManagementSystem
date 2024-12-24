



const Inputfield = ({labelfor , placeholder , labelname ,inputType ,icon ,onchange,textcolor,borderC,Value,styles,inputRequired}) => {

    return (
   <>
       <div className={`w-full h-2/4 flex flex-col justify-start ${textcolor || 'dark:text-gray-600'} text-blue-700 m-2 ${styles}`}>
        <label className= 'block text-gray-700 text-sm font-bold mb-1 w-fit' htmlFor={labelfor} >{labelname}</label>
         <div className='flex w-full justify-between '>
         <input  required={inputRequired} onChange = {onchange}className = {`placeholder-gray-500 w-full bg-transparent h-full border focus:outline-none focus:ring-2 ${borderC } rounded-lg py-2 outline-none text-black dark:text-white px-2`} value={Value} type={inputType} name={labelfor} placeholder={placeholder} />
         
         </div>
       </div>
   </>
  )
}

export default Inputfield