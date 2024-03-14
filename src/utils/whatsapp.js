// export default function encodePedido(pedido) {
//     const encodedMessage = encodeURIComponent(pedido);
//     const replacedSpaces = encodedMessage.replace(/%20/g, '+');
//     const encodedURLSafe = replacedSpaces.replace(/[!'()*]/g, (c) => {
//       return '%' + c.charCodeAt(0).toString(16);
//     });
//     const trimmedTrailingPlus = encodedURLSafe.replace(/\++$/g, '');
//     return `https://wa.me/5492214087322?text=${trimmedTrailingPlus}&type=phone_number&app_absent=0`;
//   }
export default function encodePedido(pedido) {
    let removed = pedido
       let array = removed.split("{")
     removed = array.join("")
      array = removed.split("}")
      removed = array.join("")
      console.log("anda?"+ removed)
    const encodedMessage = encodeURIComponent(JSON.stringify(removed));
    const replacedSpaces = encodedMessage.replace(/%20/g, '+');
    const encodedURLSafe = replacedSpaces.replace(/[!'()*]/g, (c) => {
      return '%' + c.charCodeAt(0).toString(16);
    });
    const trimmedTrailingPlus = encodedURLSafe.replace(/\++$/g, '');
    const removedBrackets = trimmedTrailingPlus.replace(/[\[\]{}]/g, '');
    let removedCommas = removedBrackets.replace(/,/g, '');
    // let array = removedCommas.split("{")
    // removedCommas = array.join("")
    //  array = removedCommas.split("}")
    //  removedCommas = array.join("")
    return `https://wa.me/5492214087322?text=${removedCommas}&type=phone_number&app_absent=0`;
  }