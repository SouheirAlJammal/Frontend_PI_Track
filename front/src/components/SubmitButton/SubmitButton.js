import React from 'react'
import style from './SubmitButton.module.css'
const SubmitButton = () => {
  return (
    <button type="submit"  className={`${style.btn} ${style.btnWarning} ${style.btnLg} ${style.btnBlock}`}>Click Me</button>
  )
}

export default SubmitButton