import React,{useState} from "react";
import { Formik, Form , Field } from "formik";
import { useForm } from "react-hook-form";
function App () {


  const {
    register, 
    formState: {errors},
    handleSubmit,
    reset
  } = useForm({mode: "onTouched"})

  const submit = (value) => {
    console.log(value)
    reset();
  }
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(submit)}>
        <label>Name</label>
        <input {...register('name',{
           required: "Required",
           minLength: {
           value: 2,
           message: "Minimum 2 characters"}
          ,
            pattern: {
              value: /[A-Z]$/i,
              message: "Invalid name"},
          
            })} 
className={errors.name ? "invalid" : ""}/>
{errors.name && <p>{errors.name.message}</p>}

        <label>Login</label>
        <input {...register('login',{
          required: "Required",
          minLength: {
            value: 6,
          message: "Invalid login"
         }
       })}
  className={errors.login ? "invalid" : ""}/>
  {errors.login && <p>{errors.login.message}</p>}
        <label>Age</label>
        <input type="number" {...register('age',{
          required: "Required",
          min: {
          value:18,
          message: "Invalid age"
         }
       })}
  className={errors.age ? "invalid" : ""}/>
  {errors.age && <p>{errors.age.message}</p>}
        
        <label>Email</label>
        <input {...register('email',{
          required: "Required",
          pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "Invalid email address"
         }
       })}
  className={errors.email ? "invalid" : ""}/>
  {errors.email && <p>{errors.email.message}</p>}

        <button type="submit">Sign in</button>
      </form>
    </div>
    );

/*
  
 // Завдання 3 (formik)

  const validateName = (value) =>{
     if (value.length < 2){
      return 'Invalid name'
    }else if (/[0-9]/.test(value)){
      return 'Invalid name'
    }
   }
  
    const validateEmail = (value) =>{
    if(!value){
      return 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)){
      return 'Invalid email address'
    }
   }
   const validateAge = (value) =>{
    if(!value){
      return 'Required'
    } else if (value < 18){
      return 'Invalid age'
    }
   }
   const validateLogin = (value) =>{
    if(!value){
      return 'Required'
    } else if (value.length < 5){
      return 'Invalid login'
    }
   }


   return (
  <div className="wrapper">
    <Formik
      initialValues={{
        name: '', 
        login: '',
        age:'',
        email: ''
      }}
      onSubmit={values => {console.log(values)}}
      >
        {({errors, touched}) => (
          <Form>
          <label>Name</label>
          <Field name="name" validate={validateName} className={errors.name && touched.name ? "invalid" : ""}/>
          {errors.name && touched.name && <p>{errors.name}</p>}
          <label>Login</label>
          <Field name="login" validate={validateLogin} className={errors.login && touched.login ? "invalid" : ""}/>
          <label>Age</label>
          <Field type="number" name="age" validate={validateAge} className={errors.age && touched.age ? "invalid" : ""}/>
          <label>Email</label>
          <Field  name="email" validate={validateEmail} className={errors.email && touched.email ? "invalid" : ""}/>
          <button type="submit">Sign in</button>
          </Form>
        )}
      </Formik>

    
  </div>
  );
  */

  /*

  //Завдання 2 (без бібліотек)

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const [wasNameTouched, setWasNameTouched] = useState(false);
  const [wasEmailTouched, setWasEmailTouched] = useState(false);
  const [wasAgeTouched, setWasAgeTouched] = useState(false);
  const [wasLoginTouched, setWasLoginTouched] = useState(false);
  
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [isAgeValid, setIsAgeValid] = useState(false);

  const nameLostFocus = () => {
    setWasNameTouched(true)
    if(name.length < 2 ){
      setIsNameValid(false);
      return
    } else if(/[0-9]/.test(name)) {
      setIsNameValid(false);
      return
    } 
    setIsNameValid(true);
  }

  const emailLostFocus = () => {
    setWasEmailTouched(true)
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
      setIsEmailValid(false);
      return
    }
    setIsEmailValid(true);
  }
  const ageLostFocus = () => {
    setWasAgeTouched(true)
    if (age < 18){
      setIsAgeValid(false);
      return
    }
    setIsAgeValid(true);
  }
  const loginLostFocus = () => {
    setWasLoginTouched(true)
    if (login.length < 6){
      setIsLoginValid(false);
      return
    }
    setIsLoginValid(true);
  }

  const submit = (e) => {
    e.preventDefault();
    setWasNameTouched(true);
    setWasEmailTouched(true);
    setWasAgeTouched(true);

    if(name.length < 2){
      setIsNameValid(false);
      return
    }
    if (/[0-9]/.test(name)){
      setIsNameValid(false);
      return
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
      setIsEmailValid(false);
      return
    }
    if (login.length < 6 ){
      setIsEmailValid(false);
      return
    }
    if (age < 18){
      setIsEmailValid(false);
      return
    }

    setIsNameValid(true);
    setIsEmailValid(true);
    setIsLoginValid(true);
    setIsAgeValid(true);
    console.log(name,login,age,email);
}
  const nameChange = e => setName(e.target.value);
  const loginChange = e => setLogin(e.target.value);
  const ageChange = e => setAge(e.target.value);
  const emailChange = e => setEmail(e.target.value);


return (
<div className="wrapper">
  <form onSubmit={submit}>
    <label>Name</label>
    <input onInput={nameChange} onBlur={nameLostFocus}  className={!isNameValid && wasNameTouched ? "invalid" : ""} />
    {!isNameValid && wasNameTouched && <p>Enter correct name</p>}
    <label>Login</label>
    <input onInput={loginChange} onBlur={loginLostFocus} className={!isLoginValid && wasLoginTouched ? "invalid" : ""} />
    {!isLoginValid && wasLoginTouched && <p>Enter correct login</p>}
    <label>Age</label>
    <input onInput={ageChange} onBlur={ageLostFocus} type="number" className={!isAgeValid && wasAgeTouched ? "invalid" : ""}/>
    {!isAgeValid && wasAgeTouched && <p>Enter correct age</p>}
    <label>Email</label>
    <input onInput={emailChange} onBlur={emailLostFocus} className={!isEmailValid && wasEmailTouched ? "invalid" : ""} />
    {!isEmailValid && wasEmailTouched && <p>Enter correct email</p>}
    <button type="submit">Sign in</button>
  </form>
</div>
);
*/

} 

export default App;