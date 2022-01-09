const SubscribeBox = () => {
   const [submitted, setSubmitted] = React.useState(false);
   const [email, setEmail] = React.useState('');
   const [errorMsg, setErrorMsg] = React.useState('');
   const formElementRef = React.useRef(null);
   const acceptTermsCheckboxRef = React.useRef(null);
   const submitFormRef = () => {
      const form = formElementRef.current;
      if (typeof form.requestSubmit === 'function') {
         form.requestSubmit();
      } else {
         form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
   };
   const validateInput = (email) => {
      if (!email.length) {
         setErrorMsg('Email address is required');
         return false;
      }
      if (
         !email
            .toLowerCase()
            .match(
               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
      ) {
         setErrorMsg('Please provide a valid e-mail address');
         return false;
      }
      if (!acceptTermsCheckboxRef.current.checked) {
         setErrorMsg('You must accept the terms and conditions');
         return false;
      }
      if (email.slice(-2) === 'co') {
         setErrorMsg('We are not accepting subscriptions from Colombia emails');
         return false;
      }
      setErrorMsg('');
      return true;
   };
   const submit = async (event) => {
      event.preventDefault();
      if (!validateInput(email)) return;
      const response = await fetch(`backend/submit.php?email=${email}`, {
         method: 'get',
      });
      if (!response) {
         setErrorMsg('No response from server');
         return;
      }
      const res = await response.json();
      if (res.result !== 'success') {
         setErrorMsg('Failure to submit');
         return;
      }
      setSubmitted(true);
   };
   return (
      <div id="emailBoxContainer" className={submitted ? 'submitted' : 'notSubmitted'}>
         {!submitted ? (
            <form ref={formElementRef} id="emailForm" onSubmit={submit}>
               <h1>Subscribe to newsletter</h1>
               <p>Subscribe to our newsletter and get 10% discount on pineapple glasses.</p>
               <div className="inputContainer">
                  <div id="emailInputContainer">
                     <div id="emailInputFloatingContainer">
                        <span className="blueBorder"></span>
                        <input
                           onChange={({ target: { value } }) => setEmail(value)}
                           type="text"
                           name="email"
                           placeholder="Type your email address here..."
                        />
                        <label onClick={submitFormRef} htmlFor="email" className="icon-ic_arrow"></label>
                     </div>
                  </div>
               </div>
               {errorMsg.length !== 0 && <p id="errorMsg">{errorMsg}</p>}

               <div id="confirmTerms" style={{ marginTop: errorMsg.length ? 5 : '' }}>
                  <input id="agreeToTerms" type="checkbox" name="check" ref={acceptTermsCheckboxRef} />
                  <label htmlFor="check" className="icon-ic_checkmark"></label>
                  <p>
                     I agree to{' '}
                     <a id="terms" href="#">
                        terms of service
                     </a>
                  </p>
               </div>
            </form>
         ) : (
            <form id="emailForm">
               <div className="icon-ic_trophy" />
               <h1>Thanks for subscribing!</h1>
               <p>You have successfully subscribed to our email listing. Check your email for the discount code.</p>
            </form>
         )}
         <div id="socialsContainer">
            <ul id="socials">
               <li>
                  <a href="#" className="icon-ic_facebook" />
               </li>
               <li>
                  <a href="#" className="icon-ic_instagram" />
               </li>
               <li>
                  <a href="#" className="icon-ic_twitter" />
               </li>
               <li>
                  <a href="#" className="icon-ic_youtube" />
               </li>
            </ul>
         </div>
      </div>
   );
};
