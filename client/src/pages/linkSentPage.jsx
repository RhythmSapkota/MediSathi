/* eslint-disable react/prop-types */
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const SentPage = ({ email }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(120); // Initial time set to 2 minutes (120 seconds)

  const redirectToEmailClient = () => {
    // Get the user's email address
    const userEmail = email;

    // Extract the domain from the email address
    const emailDomain = userEmail.split('@')[1].toLowerCase();

    // List of popular email domains and their corresponding redirect URLs
    const emailDomains = {
      'gmail.com': 'https://mail.google.com',
      'outlook.com': 'https://outlook.live.com',
      'hotmail.com': 'https://outlook.live.com',
      'live.com': 'https://outlook.live.com',
      'yahoo.com': 'https://mail.yahoo.com',
      'aol.com': 'https://mail.aol.com',
      'icloud.com': 'https://www.icloud.com/mail',
      'mac.com': 'https://www.icloud.com/mail',
      'me.com': 'https://www.icloud.com/mail',
      'mail.com': 'https://www.mail.com',
      'protonmail.com': 'https://mail.protonmail.com',
      'zoho.com': 'https://mail.zoho.com',
      'gmx.com': 'https://www.gmx.com/mail',
      'yandex.com': 'https://mail.yandex.com',
      'comcast.net': 'https://login.xfinity.com/login',
      'verizon.net': 'https://www.verizon.com/home/verizon-net-login/',
      'att.net': 'https://signin.att.com',
      'cox.net': 'https://webmail.cox.net',
      'earthlink.net': 'https://webmail.earthlink.net',
      'fastmail.com': 'https://www.fastmail.com',
      'tutanota.com': 'https://mail.tutanota.com',
      'hushmail.com': 'https://www.hushmail.com',
      'rocketmail.com': 'https://mail.yahoo.com',
      'bluemail.me': 'https://bluemail.me'
    };

    if (emailDomain in emailDomains) {
      window.open(emailDomains[emailDomain], '_blank');
    } else {
      window.open(`mailto:${userEmail}`, '_blank');
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const resendEmail = async () => {
    const data = { email: email }
    try {
      setIsDisabled(true);
      setTimeLeft(120);
      setTimeout(() => {
        setIsDisabled(false);
      }, 120000);
      await customFetch.post('/auth/forgot-password', data);
      toast.success('Password Reset Link is Sent')
    } catch (error) {
      return error
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    console.log(timeLeft)
    if (timeLeft === 0) {
      setIsDisabled(false);
      return clearInterval(timer)
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDisabled(false);
    }, 120000);
    return () => clearTimeout(timeout);
  }, []);


  return (
    <Wrapper>
      <div className='form' style={{ maxWidth: "700px" }}>
        <div>
          <p>An email has been sent with a reset link to your email address.</p>
          <button onClick={redirectToEmailClient} className='btn btn-block'>
            Go to Email
          </button>
          <button onClick={resendEmail} disabled={isDisabled} className={isDisabled ? "btn btn-block disabled" : 'btn btn-block'}>
            Resend Link
          </button>
          {formatTime(timeLeft) !== "00:00" && <span style={{ paddingTop: "2rem" }}>Resend in: {formatTime(timeLeft)}</span>}
        </div>
      </div>
    </Wrapper>
  );
}

export default SentPage;
