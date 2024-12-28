export const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

export const login = (email: string) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: { email: string }) => u.email === email);
  
  if (!user) {
    throw new Error('No account found with this email');
  }
  
  if (!user.emailConfirmed) {
    throw new Error('Please confirm your email before logging in');
  }

  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("loginTime", Date.now().toString());
  localStorage.setItem("userEmail", email);
};

export const signup = (email: string) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (users.some((u: { email: string }) => u.email === email)) {
    throw new Error('An account with this email already exists');
  }

  // In a real app, we would send an email here
  const confirmationToken = Math.random().toString(36).substring(2);
  
  users.push({
    email,
    emailConfirmed: false,
    confirmationToken
  });
  
  localStorage.setItem('users', JSON.stringify(users));
  
  // Simulate sending confirmation email
  console.log(`Confirmation link: http://localhost:3000/confirm/${confirmationToken}`);
  
  throw new Error('Please check your email to confirm your account');
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

export const checkAuth = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const loginTime = localStorage.getItem("loginTime");

  if (!isAuthenticated || !loginTime) {
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
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (isAuthenticated) {
    localStorage.setItem("loginTime", Date.now().toString());
  }
};