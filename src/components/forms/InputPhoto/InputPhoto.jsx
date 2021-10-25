import React from "react";
import clsx from 'clsx';
import s from "components/forms/InputPhoto/InputPhoto.module.scss";

export const InputPhoto = ({ id, name, formProps, className }) => {
  const [file, setFile] = React.useState("");

  const handleChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  React.useEffect(() => {
    formProps.setFieldValue(name, file);
  }, [file]);
  return (
    <div className={clsx(s.item, s[className])}>
      <div className={s.box}>
        {file && <img src={file} alt="" className={s.image}/>}
        {!file && <label className={s.label} htmlFor={name} style={{ "backgroundImage": file }}>
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.1" cx="15.2132" cy="15.2131" r="15" transform="rotate(-45 15.2132 15.2131)" fill="#184240"/>
            <path d="M8.14063 15.2133L22.1937 15.2131" stroke="#184240"/>
            <path d="M15.2187 8.23523L15.2189 22.2884" stroke="#184240"/>
          </svg>
        </label>}
      </div>
      {/*<label htmlFor={id} className={s.text}>Изменить аватар</label>*/}
      <input id={id} name={"photo"} className={s.input} type="file"
             onChange={e => handleChange(e)}/>
    </div>
  );
};