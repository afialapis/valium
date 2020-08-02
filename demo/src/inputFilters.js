const fltInteger = value => /^-?\d+$/.test(value)

const fltUnsignedInteger = value => /^\d+$/.test(value)

const fltUnsignedIntegerLimited = value => /^\d+$/.test(value) && (value === "" || parseInt(value) <= 500)

const fltFloat = value => /^-?\d*[.,]?\d*$/.test(value)

const fltCurrency = value => /^-?\d*[.,]?\d{0,2}$/.test(value)

const fltLatin = value => /^[a-z ]*$/i.test(value)

const fltHexadecimal = value => /^[0-9a-f]*$/i.test(value)


export {fltInteger, fltUnsignedInteger, fltUnsignedIntegerLimited, 
        fltFloat, fltCurrency, fltLatin, fltHexadecimal}