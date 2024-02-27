export function numberMask (number) {
  
    return new Intl.NumberFormat("ES-MX",{
      style:'currency',
      currency: 'MXN',
    }).format(number)
  
  }
   
  export function numberMaskUnit (number) {
    let formattedValue = number.toString().replace(/\D/g, ''); 
  let numericValue = parseInt(formattedValue);
  return new Intl.NumberFormat().format(numericValue);
  
  }
   