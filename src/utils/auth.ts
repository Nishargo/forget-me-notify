import { supabase } from '@/lib/supabase';

export const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

export const login = async (email: string, password: string) => {
  console.log('Attempting login for email:', email);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Login error:', error);
    
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Invalid email or password. Please try again.');
    }
    
    if (error.message.includes('Email not confirmed')) {
      // Resend confirmation email
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (resendError) {
        console.error('Error resending confirmation:', resendError);
        throw resendError;
      }

      throw new Error('Please confirm your email. A new confirmation email has been sent.');
    }

    throw error;
  }

  if (!data.user) {
    throw new Error('No account found with this email');
  }

  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("loginTime", Date.now().toString());
};

export const signup = async (email: string, password: string) => {
  console.log('Starting signup process for email:', email);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: {
        email_confirm_sent: true
      }
    }
  });

  if (error) {
    console.error('Signup error:', error);
    throw error;
  }

  console.log('Signup response:', data);
  
  if (!data?.user?.identities?.length) {
    console.log('No identities found, user might already exist');
    throw new Error('Email already registered. Please try logging in instead.');
  }

  // Check if confirmation email was sent
  if (!data.user.email_confirmed_at) {
    console.log('Email confirmation required, confirmation email should be sent');
  } else {
    console.log('Email already confirmed');
  }

  return data;
};

export const logout = async () => {
  await supabase.auth.signOut();
  localStorage.clear();
  window.location.href = '/';
};

export const checkAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const loginTime = localStorage.getItem("loginTime");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!session || !isAuthenticated || !loginTime) {
    logout();
    return false;
  }

  const timeElapsed = Date.now() - parseInt(loginTime);
  if (timeElapsed > AUTO_LOGOUT_TIME) {
    logout();
    return false;
  }

  return true;
};

export const updateLoginTime = () => {
  localStorage.setItem("loginTime", Date.now().toString());
};
