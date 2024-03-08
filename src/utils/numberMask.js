export function numberMask (number) {
  
    return new Intl.NumberFormat("en-MX",{
      style:'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(number)
  
  }
   
  export function numberMaskUnit (number) {
    let formattedValue = number.toString().replace(/\D/g, ''); 
  let numericValue = parseInt(formattedValue);
  return new Intl.NumberFormat().format(numericValue);
  
  }
   